const Library = require('./library');
const pathLib = require('path');
const SerieMetadata = require('../metadata/tvMetadata');
const db = require('../db');
const lock = require('../globalLock');

const LANGUAGE_LIST = require('../../lib/languages');


const MOVIE_FORMATS = [
    'mp4', 'ts', 'mkv', 'webm', 'avi', 'm4v'
];
const SUB_FORMATS = [
    'srt', 'vtt', 'sub'
]

class TvLibrary extends Library {

    /**
     * Creates a new instance of a TV library
     * 
     * @param {String} name - The name of the library
     * @param {String} path - The path of the library
     * @param {String} id - The id of the library
     * 
     */
    constructor(name, path, id) {
        super(name, path, id, new SerieMetadata());
    }

    getType() {
        return 'SERIES';
    }

    checkIfSerie(path) {
        return !(path.includes('\\') || path.includes('//'))
    }

    addSerieIfNotSaved(serieName, path) {
        return new Promise(async (resolve, reject) => {
            await db.tx(async t => {
                // Check if we have already saved this show
                let result = await t.any('SELECT * FROM serie WHERE path = $1 AND library = $2', [path, this.id]);
                // If we haven't saved this show, insert it
                if (result.length === 0) {
                    console.log(` > Found a new serie (${path} for library: '${this.name}')`);
                    // Insert to the serie table (contining the path of the serie)
                    await t.none('INSERT INTO serie (path, library, name) VALUES ($1, $2, $3)', [path, this.id, serieName]);
                    // Get the internal ID for the new show
                    result = await t.one('SELECT id FROM serie WHERE path = $1 AND library = $2', [path, this.id]);
                    let internalSerieID = result.id;

                    // Get the metadata for the show
                    this.metadata.getShowMetadata(serieName).then(result => {
                        let metadata = result.metadata;
                        let images = result.images;
                        let trailer = result.trailer;

                        // If we didn't find any metadata, insert dummy metadata
                        if (metadata === null) {
                            console.log(` > Couldn't find any metadata for serie '${serieName}'`);
                            images = {
                                backdrops: [],
                                posters: []
                            }
                            metadata = this.metadata.getDummyMetadata(serieName);
                            trailer = "";
                            
                            this.metadata.insertShowMetadata(metadata, images, trailer, internalSerieID).then(() => {
                                resolve();
                            });
                        } else {
                            // If we found metadata, save it
                            console.log(` > Saving metadata for serie '${serieName}'`);
                            // Insert metadata
                            this.metadata.insertShowMetadata(metadata, images, trailer, internalSerieID).then(() => {
                                resolve();
                            });
                        }
                    });
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Adds a subtitle to the database if it is not already saved
     * 
     * @param {string} showName - The showname associated with the subtitle
     * @param {string} path  - The full path to the subtitle file
     * @param {string} showPath  - The full path to the associated show
     * @param {integer} seasonNumber - The season number for the subtitle
     * @param {integer} episodeNumber  - the episode number for the subtitle
     */
    addSubtitleIfNotSaved(showName, path, showPath, seasonNumber, episodeNumber) {
        //console.log("hh")
        return new Promise(async (resolve, reject) => {
            let fileName = pathLib.basename(path);
            let language = null;
            for (let lang of LANGUAGE_LIST) {
                if (fileName.toString().toLocaleLowerCase().includes('_' + lang.shortName)) {
                    language = lang.longName;
                    break;
                }
            }
            await db.one('SELECT * FROM serie_episode WHERE serie_id = (SELECT id FROM serie WHERE path = $1 AND library = $2) AND episode = $3 AND season_number = $4', [showPath, this.id, episodeNumber, seasonNumber])
            .then(episode => {
                db.any('SELECT * FROM serie_episode_subtitle WHERE episode_id = $1 AND path = $2 AND library_id = $3', [episode.id, path, this.id])
                .then(async (result) => {
                    if (result.length === 0) {
                        console.log(` > Saving subtitle for ${showName} in library ${this.name}`);
                        await db.none('INSERT INTO serie_episode_subtitle (path, episode_id, library_id, language) VALUES ($1, $2, $3, $4)', [path, episode.id, this.id, language]);
                        console.log("inne här")
                    }
                    resolve();
                });
            })
            .catch(err => {
                console.log(`Couldn't find any matching shows for subtitle ${path}`);
                console.log(err);
                resolve();
            });
        });
    }

    async addSeasonIfNotSaved(serieName, seasonPath, showPath, seasonNumber) {
        return new Promise(async (resolve, reject) => {
            await db.tx(async t => {
                // Check if we have already saved this season for the show
                let result = await t.any('SELECT * FROM serie_season WHERE season_number = $1 AND serie_id IN (SELECT id FROM serie WHERE name = $2 AND path = $3)', [seasonNumber, serieName, showPath]);
                // If we don't have it saved, save it to the database
                if (result.length === 0) {
                    console.log(` > Found a new season (${seasonNumber}) for the show ${serieName} in library ${this.name}`);
                    await t.none('INSERT INTO serie_season (serie_id, season_number, path) VALUES ((SELECT id FROM serie WHERE name = $1 AND path = $2), $3, $4) ', [serieName, showPath, seasonNumber, seasonPath]);


                    // Get the Tmdb id for the show
                    let serieTmdbId = await t.one('SELECT tmdb_id FROM serie_metadata WHERE serie_id IN (SELECT id FROM serie WHERE name = $1 AND path = $2)', [serieName, showPath], c => +c.tmdb_id);
                    // Get the internal ID for the show
                    let internalSerieID = await t.one(`SELECT id FROM serie WHERE name = $1 AND path = $2`, [serieName, showPath], c => +c.id);

                    // Get the metadata for this season
                    this.metadata.getSeasonMetadata(serieTmdbId, seasonNumber).then(async (result) => {
                        let metadata = result.metadata;

                        // If we didn't find any metadata, save dummymetadata
                        if (metadata === null) {
                            console.log(` > Couldn't find any metadata for season ${seasonNumber} of serie ${serieName}`);
                             resolve();
                            // TODO: GET AND SAVE DUMMYDATA
                        } else {
                            // If we found metadata, save it to the database
                            console.log(` > Saving metadata for season ${seasonNumber} of serie ${serieName}`);
                            this.metadata.insertSeasonMetadata(metadata, internalSerieID, seasonNumber).then(() => {
                                resolve();
                            });
                        }
                    });
                } else {
                    //console.log("season result was not 0.....")
                    resolve();
                }
            });
        });
    }

    addEpisodeIfNotSaved(serieName, episodePath, showPath, seasonNumber, episodeNumber) {
        return new Promise(async (resolve, reject) => {
            await db.tx(async t => {
                let result = await t.any('SELECT * FROM serie_episode WHERE season_number = $1 AND episode = $2 AND serie_id IN (SELECT id FROM serie WHERE name = $3 AND path = $4)', [seasonNumber, episodeNumber, serieName, showPath]);
                if (result.length === 0) {
                    console.log(` > Found a new episode (Season ${seasonNumber} episode ${episodeNumber}) for the show ${serieName} in library ${this.name}`);
                    let internal_episode_id = await t.one('INSERT INTO serie_episode (season_number, serie_id, episode, path) VALUES ($1, (SELECT id FROM serie WHERE name = $2 AND path = $3), $4, $5) RETURNING id', [seasonNumber, serieName, showPath, episodeNumber, episodePath]);
                    internal_episode_id = internal_episode_id.id;
                    
		// CURENTLY DISABLED
                    //console.log(` > Trying to convert subtitles, this may take a while...`);
                    // Try to convert the subtitles from the movie
                    //let subtitleConvertionResult = await this.convertSubtitles(serieName, episodePath, episodeNumber, seasonNumber);
                
                    // If the conversion failed (because the file was busy), try again.
                    //while(!subtitleConvertionResult) {
                    //    subtitleConvertionResult = await this.convertSubtitles(serieName, episodePath, episodeNumber, seasonNumber);
                    //}

                    let audio_streams = await this.findAudioStreams(serieName, episodePath);
                    console.log(audio_streams);
                    if (audio_streams) {
                        for (let stream of audio_streams) {
                            t.none('INSERT INTO serie_episode_language (serie_episode_id, language, stream_index) VALUES ($1, $2, $3)', [internal_episode_id, stream.language, stream.stream]);
                        }
                    }


                    // Get the internal serie id for the episode
                    let internalSerieID = await t.one(`SELECT id FROM serie WHERE name = $1 AND path = $2`, [serieName, showPath], c => +c.id);
                    // Get the Tmdb id for the show
                    let serieTmdbId = await t.one('SELECT tmdb_id FROM serie_metadata WHERE serie_id IN (SELECT id FROM serie WHERE name = $1 AND path = $2)', [serieName, showPath], c => +c.tmdb_id);
                    this.metadata.getEpisodeMetadata(serieTmdbId, seasonNumber, episodeNumber).then(result => {
                        let metadata = result.metadata;

                        if (metadata === null) {
                            console.log(` > Couldn't find any metadata for season ${seasonNumber} episode ${episodeNumber} of serie ${serieName}`);
                            // TODO: GET AND SAVE DUMMYDATA
                            resolve();
                        } else {
                            console.log(` > Saving metadata for season ${seasonNumber} episode ${episodeNumber} of serie ${serieName}`);
                            this.metadata.insertEpisodeMetadata(metadata, internalSerieID, seasonNumber, episodeNumber).then(() => {
                                console.log("Resolving");
                                resolve();
                            });
                        }
                    });

                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Tries to parse the path and get the season number.
     * Returns the seasonNumber or false if it couldn't parse it
     * @param {string} path 
     */
    getSeasonNumber(path) {
        let dirname = pathLib.dirname(path);
        dirname = dirname.substring(dirname.indexOf("/") + 1);
        dirname = dirname.substring(dirname.indexOf("\\") + 1);
        let seasonNumber = dirname.replace( /^\D+/g, '')
        seasonNumber = parseInt(seasonNumber);
        return !Number.isNaN(seasonNumber) ? seasonNumber : false
    }

    /**
     * Tries to get the showname for a path.
     * 
     * @param {string} path 
     */
    getShowName(path) {
        let dirname = pathLib.dirname(path);
        let outerDirname = pathLib.dirname(dirname);
        outerDirname = outerDirname.substring(outerDirname.indexOf("/") + 1);
        outerDirname = outerDirname.substring(outerDirname.indexOf("\\") + 1);
        return this.nameMatch(outerDirname);
    }

    /**
     * Returns the showpath
     * @param {string} path 
     */
    getShowPath(path) {
        let dirname = pathLib.dirname(path);
        let outerDirname = pathLib.dirname(dirname);
        return outerDirname;
    }

    /**
     * Returns the seasonpath
     * @param {string} path 
     */
    getSeasonPath(path) {
        return pathLib.dirname(path);
    }

    /**
     * Tries to parse the episode number.
     * Returns the episode number or false if it couldn't parse it
     * @param {string} path 
     */
    getEpisodeNumber(path) {
        let filename = path.replace(/^.*[\\\/]/, '')

        let re = new RegExp("[S|s]\\d+[E|e](\\d+)", 'gm');
        let matches = re.exec(filename);
        if (matches != null && matches.length >= 2) {
            return matches[1];
        } else {
            re = new RegExp("\\d+x(\\d+)", 'gm');
            matches = re.exec(filename);
            if (matches != null && matches.length >= 2) {
                return matches[1];
            } else {
                return false;
            }
        }
    }

    async newEntry(path) {
        return new Promise(async (resolve, reject) => {
            let fileExtension = path.substring(path.lastIndexOf('.') + 1);
            if (!MOVIE_FORMATS.includes(fileExtension) && !SUB_FORMATS.includes(fileExtension)) {
                console.log("\x1b[33m", `> ${path} is not a supported format.`, "\x1b[0m");
                resolve();
            } else {
                let type = MOVIE_FORMATS.includes(fileExtension) ? 'SHOW' : 'SUBTITLE'
                //console.log(type);
                let t = this;
                // Lock so each library only can handle one serie at a time (for race condition with episodes)
               // lock.acquire("abcdefg", async function(done) {
                lock.enter(async function (token) {
                    if (path == "Family Guy\Season 8 V2 Remaster HEVC\Family Guy - S08E04 - Brian`s Got a Brand New Bag-4.mkv") {
                        print("Låst");
                    }
                    let seasonNumber = t.getSeasonNumber(path);
                    let episodeNumber = t.getEpisodeNumber(path);
    
                    if (seasonNumber === false) {
                        console.log(`> Couldn't find a season number for ${path} (${seasonNumber}). Stopping.`);
                    } else if (episodeNumber === false) {
                        console.log(`> Couldn't find a episode number for ${path}, Stopping.`);
                    } else {
                        episodeNumber = parseInt(episodeNumber);
                        let showName = t.getShowName(path);
                        let showPath = t.getShowPath(path);
                        let seasonPath = t.getSeasonPath(path);
                        if (type === 'SHOW') {
                            await t.addSerieIfNotSaved(showName, showPath);
                            await t.addSeasonIfNotSaved(showName, seasonPath, showPath, seasonNumber);
                            await t.addEpisodeIfNotSaved(showName, path, showPath, seasonNumber, episodeNumber);
                            //console.log("efter");
                        } else if (type === 'SUBTITLE') {
                            await t.addSubtitleIfNotSaved(showName, path, showPath, seasonNumber, episodeNumber);
                            //console.log("kk");
                        }
                    }
                    lock.leave(token);
                });

                    //done();
                //}, function() {
                //    console.log("LOCK RESOLVE" + path)
                //    resolve();
                //});
            }

        });
    }

    async removeEntry(path) {
        return new Promise(async (resolve, reject) => {
            let t = this;
	    lock.enter(async function (token) {
                // Remove the subtitle if that is what we are removing
                db.any('SELECT * FROM serie_episode_subtitle WHERE path = $1 AND library_id = $2', [path, t.id])
                .then(result => {
                    if (result.length > 0) {
                        console.log(` > Removing a subtitle for episode ID ${result[0].id} from library '${t.name}'`);
                        db.none('DELETE FROM serie_episode_subtitle WHERE path = $1 AND library_id = $2', [path, t.id]);
                    }
                });

                db.any('SELECT * FROM serie_episode WHERE path = $1', [path]).then(async (episodeInformation) => {
                    if (episodeInformation.length > 0) {
                        console.log(` > Removing episode ${episodeInformation[0].episode} in season ${episodeInformation[0].season_number} for serie with ID ${episodeInformation[0].serie_id}`);
                        // Remove the episode
                        await db.none('DELETE FROM serie_episode WHERE path = $1', [path]);
                        // Remove the episodes metadata
                        await db.none('DELETE FROM serie_episode_metadata WHERE season_number = $1 AND serie_id = $2 AND episode_number = $3', [episodeInformation[0].season_number, episodeInformation[0].serie_id, episodeInformation[0].episode]);
                        // Remove the associated subtitle
                        await db.none('DELETE FROM serie_episode_subtitle WHERE episode_id = $1 AND library_id = $2', [episodeInformation.id, t.id]);


                        // Check if there are no more episodes saved in the database after we removed this one, if that is the case: Remove the season from the database
                        db.any('SELECT * FROM serie_episode WHERE serie_id = $1 AND season_number = $2', [episodeInformation[0].serie_id, episodeInformation[0].season_number]).then(async (result) => {
                            if (result.length === 0) {
                                console.log(` > No more saved episodes in season ${episodeInformation[0].season_number} for serie ${episodeInformation[0].serie_id}, removing the season from the database.`);

                                // Remove the season
                                await db.none('DELETE FROM serie_season WHERE serie_id = $1 AND season_number = $2', [episodeInformation[0].serie_id, episodeInformation[0].season_number]);
                                await db.none('DELETE FROM serie_season_metadata WHERE serie_id = $1 AND season_id = $2', [episodeInformation[0].serie_id, episodeInformation[0].season_number]);
                                
                                // Check if there are no more seasons saved in the database after we removed the season, if that is the case: Remove the serie from the database
                                db.any('SELECT * FROM serie_season WHERE serie_id = $1', [episodeInformation[0].serie_id]).then(async (result) => {
                                    if (result.length === 0) {
                                        console.log(` > No more seasons in the show ${episodeInformation[0].serie_id}, removing the show from the database.`);

                                        // Remove the serie
                                        await db.none('DELETE FROM serie WHERE id = $1', [episodeInformation[0].serie_id]);
                                        await db.none('DELETE FROM serie_metadata WHERE serie_id = $1', [episodeInformation[0].serie_id]);
                                    }
					lock.leave(token);
                                });
                            } else {
lock.leave(token);
                            }
                        });
                    } else {
lock.leave(token);
                    }
                });
            });
        });
    }
}

module.exports = TvLibrary;

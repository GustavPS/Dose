const Library = require('./library');
const pathLib = require('path');
const SerieMetadata = require('../metadata/tvMetadata');
const db = require('../db');
const lock = require('../globalLock');
const sockets = require('../../sockets');


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
            let internalSerieID;
            let alreadyAdded = false;
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
                    internalSerieID = result.id;
                } else {
                    // Get the internal ID for the existing show so we can resolve it
                    result = await t.one('SELECT id FROM serie WHERE path = $1 AND library = $2', [path, this.id]);
                    alreadyAdded = true;
                    resolve(result.id);
                }
            }).then(data => {
                    // Get the metadata for the show
                    if (!alreadyAdded) {
                        this.metadata.getShowMetadata(serieName).then(result => {
                            let metadata = result.metadata;
                            let images = result.images;
                            let trailer = result.trailer;

                            // If we found metadata, save it
                            console.log(` > Saving metadata for serie '${serieName}'`);
                            // Insert metadata
                            this.metadata.insertShowMetadata(metadata, images, trailer, internalSerieID).then(() => {
                                let back = undefined;
                                for (let image of images.backdrops) {
                                    if(image.active == true){
                                        back = image.file_path
                                        break;
                                    }
                                }
                                sockets.emit("newShow", {"id": internalSerieID, "title": metadata.name, "overview": metadata.overview, "backdrop_path": back} )
                                resolve(internalSerieID);
                            });
                        }).catch(async (error) => {
                            console.log("\x1b[31m", ` > Couldn't find any metadata for serie' ${serieName}', stopping`, "\x1b[0m");
                            await db.none('DELETE FROM serie WHERE path = $1 AND library = $2 AND name = $3', [path, this.id, serieName]);
                            reject();
                        });
                    }
            }).catch(error => {
                console.log("ERROR IN addSerieIfNotSaved");
                console.log(error);
                reject();
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
        return new Promise(async (resolve, reject) => {
            let fileName = pathLib.basename(path);
            let subtitleInfo = this.getSubtitleInfo(fileName);

            await db.one('SELECT * FROM serie_episode WHERE serie_id = (SELECT id FROM serie WHERE path = $1 AND library = $2) AND episode = $3 AND season_number = $4', [showPath, this.id, episodeNumber, seasonNumber])
            .then(episode => {
                db.any('SELECT * FROM serie_episode_subtitle WHERE episode_id = $1 AND path = $2 AND library_id = $3', [episode.id, path, this.id])
                .then(async (result) => {
                    if (result.length === 0) {
                        console.log(` > Saving subtitle for ${showName} Season ${seasonNumber} Episode ${episodeNumber} in library ${this.name}. Language: ${subtitleInfo.language}`);
                        await db.none('INSERT INTO serie_episode_subtitle (path, episode_id, library_id, language, synced, extracted) VALUES ($1, $2, $3, $4, $5, $6)', [path,
                            episode.id,
                            this.id,
                            subtitleInfo.language,
                            subtitleInfo.synced,
                            subtitleInfo.extracted]);
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
            let internalSerieID;
            let alreadyAdded = false;
            let serieTmdbId;
            await db.tx(async t => {
                // Check if we have already saved this season for the show
                let result = await t.any('SELECT * FROM serie_season WHERE season_number = $1 AND serie_id IN (SELECT id FROM serie WHERE name = $2 AND path = $3)', [seasonNumber, serieName, showPath]);
                // If we don't have it saved, save it to the database
                if (result.length === 0) {
                    console.log(` > Found a new season (${seasonNumber}) for the show ${serieName} in library ${this.name}`);
                    await t.none('INSERT INTO serie_season (serie_id, season_number, path) VALUES ((SELECT id FROM serie WHERE name = $1 AND path = $2), $3, $4) ', [serieName, showPath, seasonNumber, seasonPath]);

                    // Get the Tmdb id for the show
                    serieTmdbId = await t.one('SELECT tmdb_id FROM serie_metadata WHERE serie_id IN (SELECT id FROM serie WHERE name = $1 AND path = $2)', [serieName, showPath], c => +c.tmdb_id);
                    // Get the internal ID for the show
                    internalSerieID = await t.one(`SELECT id FROM serie WHERE name = $1 AND path = $2`, [serieName, showPath], c => +c.id);
                } else {
                    alreadyAdded = true;
                }
            }).then(data => {
                if (!alreadyAdded) {
                    // Get the metadata for this season
                    this.metadata.getSeasonMetadata(serieTmdbId, seasonNumber).then(async (result) => {
                        let metadata = result.metadata;
                        // If we found metadata, save it to the database
                        console.log(` > Saving metadata for season ${seasonNumber} of serie ${serieName}`);
                        this.metadata.insertSeasonMetadata(metadata, internalSerieID, seasonNumber).then(() => {
                            resolve();
                        });
                    }).catch(async (error) => {
                        // TODO: Add support for dummy metadata
                        console.log("\x1b[31m", `> Couldn't find any metadata for serie' ${serieName}' Season '${seasonNumber}', stopping`, "\x1b[0m");
                        await db.none('DELETE FROM serie_season WHERE serie_id = $1 AND season_number = $2 AND path = $3', [internalSerieID, seasonNumber, seasonPath]);
                        reject();
                    });
                } else {
                    resolve();
                }
            }).catch(err => {
                console.log("TRANSACTION ERROR in addSeasonIfNotSaved");
                console.log(err);
                reject();
            });
        });
    }

    addEpisodeIfNotSaved(serieName, episodePath, showPath, seasonNumber, episodeNumber) {
        return new Promise(async (resolve, reject) => {
            let alreadyAdded = false;
            let internalSerieID;
            let serieTmdbId;
            await db.tx(async t => {
                let result = await t.any('SELECT * FROM serie_episode WHERE season_number = $1 AND episode = $2 AND serie_id IN (SELECT id FROM serie WHERE name = $3 AND path = $4)', [seasonNumber, episodeNumber, serieName, showPath]);
                if (result.length === 0) {
                    console.log(` > Found a new episode (Season ${seasonNumber} episode ${episodeNumber}) for the show ${serieName} in library ${this.name}`);
                    let internal_episode_id = await t.one('INSERT INTO serie_episode (season_number, serie_id, episode, path) VALUES ($1, (SELECT id FROM serie WHERE name = $2 AND path = $3), $4, $5) RETURNING id', [seasonNumber, serieName, showPath, episodeNumber, episodePath]);
                    internal_episode_id = internal_episode_id.id;
                    
                    const fileStreams = await this.getFileStreams(episodePath);


                    // Get and save the resolutions
                    const resolution = this.getResolutions(fileStreams);
                    await t.none(
                        'INSERT INTO serie_episode_resolution (episode_id, "240p", "360p", "480p", "720p", "1080p", "1440p", "4k", "8k", "codec") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',[
                        internal_episode_id, resolution.p240, resolution.p360, resolution.p480, resolution.p720, resolution.p1080, resolution.p1440, resolution.p4k, resolution.p8k, resolution.codec
                    ]);

                    // TODO: Parse it as a boolean somehow
                    if (process.env.EXTRACT_SUBTITLES == "TRUE") {
                        console.log(` > Trying to convert subtitles, this may take a while...`);
                        // Try to convert the subtitles from the movie
                        let subtitleConvertionResult = await this.convertSubtitles(serieName, episodePath, fileStreams, episodeNumber, seasonNumber);
                    
                        // If the conversion failed (because the file was busy), try again.
                        while(!subtitleConvertionResult) {
                            subtitleConvertionResult = await this.convertSubtitles(serieName, episodePath, fileStreams, episodeNumber, seasonNumber);
                        }
                    }

                    let audio_streams = await this.findAudioStreams(fileStreams);
                    if (audio_streams) {
                        for (let stream of audio_streams) {
                            t.none('INSERT INTO serie_episode_language (serie_episode_id, language, stream_index, codec) VALUES ($1, $2, $3, $4)', [internal_episode_id, stream.language, stream.stream, stream.codec]);
                        }
                    }

                    // Get the internal serie id for the episode
                    internalSerieID = await t.one(`SELECT id FROM serie WHERE name = $1 AND path = $2`, [serieName, showPath], c => +c.id);
                    // Get the Tmdb id for the show
                    serieTmdbId = await t.one('SELECT tmdb_id FROM serie_metadata WHERE serie_id IN (SELECT id FROM serie WHERE name = $1 AND path = $2)', [serieName, showPath], c => +c.tmdb_id);
                } else {
                    alreadyAdded = true;
                }
            }).then(data => {
                if (!alreadyAdded) {
                    this.metadata.getEpisodeMetadata(serieTmdbId, seasonNumber, episodeNumber).then(result => {
                        let metadata = result.metadata;
                        
                        console.log(` > Saving metadata for season ${seasonNumber} episode ${episodeNumber} of serie ${serieName}`);
                        this.metadata.insertEpisodeMetadata(metadata, internalSerieID, seasonNumber, episodeNumber).then(() => {
                            console.log(metadata)
                            db.tx(async t => {
                            let poster = await t.one('SELECT poster_path FROM serie_season_metadata WHERE serie_id = $1 AND season_id = $2;', [internalSerieID, seasonNumber]);
                            //let poster = await t.one('SELECT path FROM image WHERE id = $1', [imgId.image_id]);
                            let episode_id = await t.one('SELECT id FROM serie_episode WHERE serie_id = $1 AND season_number = $2 AND episode = $3', [internalSerieID, seasonNumber, episodeNumber]);
                            
                            sockets.emit("newEpisode", {"serie_id": internalSerieID, "internalepisodeid": episode_id, "season": seasonNumber, "episode": episodeNumber, "poster": poster.poster_path} )
                      });
                            resolve();
                        });
                    }).catch(async (error) => {
                        // TODO: Add support for dummy metadata
                        console.log("\x1b[31m", `> Couldn't find any metadata for season ${seasonNumber} episode ${episodeNumber} of serie ${serieName}`, "\x1b[0m");
                        await db.none('DELETE FROM serie_episode WHERE season_number = $1 AND serie_id = $2 AND episode = $3 AND path = $4', [seasonNumber, internalSerieID, episodeNumber, episodePath]);
                        reject();
                    });
                } else {
                    resolve();
                }
            }).catch(err => {
                console.log("TRANSACTION ERROR in addEpisodeIfNotSaved");
                console.log(err);
                reject();
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
                let t = this;
                // Lock so each library only can handle one serie at a time (for race condition with episodes)
                lock.enter(async function (token) {
                    let seasonNumber = t.getSeasonNumber(path);
                    let episodeNumber = t.getEpisodeNumber(path);
    
                    if (seasonNumber === false) {
                        console.log(`> Couldn't find a season number for ${path} (${seasonNumber}). Stopping.`);
                        lock.leave(token);
                    } else if (episodeNumber === false) {
                        console.log(`> Couldn't find a episode number for ${path}, Stopping.`);
                        lock.leave(token);
                    } else {
                        episodeNumber = parseInt(episodeNumber);
                        let showName = t.getShowName(path);
                        let showPath = t.getShowPath(path);
                        let seasonPath = t.getSeasonPath(path);
                        
                        // Quickfix for when we find the folder '.'
                        if (showName == '.') {
                            lock.leave(token);
                            return;
                        }
                        if (type === 'SHOW') {
                            // TODO: There must be a better way to write this?
                            t.addSerieIfNotSaved(showName, showPath).then((serieId) => {
                                t.addSeasonIfNotSaved(showName, seasonPath, showPath, seasonNumber).then(() => {
                                    t.addEpisodeIfNotSaved(showName, path, showPath, seasonNumber, episodeNumber).then(() => {
                                        lock.leave(token);

                                    // If we failed to add the episode
                                    }).catch(err => {
                                        t.removeSeasonIfNoEpisodes(serieId, seasonNumber, seasonPath).then(removed => {
                                            if (removed) {
                                                console.log(` > No more saved episodes in season ${seasonNumber} for serie ${showName}, removing the season from the database.`);
                                                t.removeShowIfNoSeasons(serieId).then((removed) => {
                                                    if (removed) {
                                                        console.log(` > No more seasons in the show ${showName}, removing the show from the database.`);
                                                    }
                                                    lock.leave(token);
                                                });
                                            } else {
                                                lock.leave(token);
                                            }
                                        });
                                    });

                                // If we failed to add the season
                                }).catch(err => {
                                    t.removeShowIfNoSeasons(serieId).then((removed) => {
                                        if (removed) {
                                            console.log(` > No more seasons in the show ${showName}, removing the show from the database.`);
                                        }
                                        lock.leave(token);
                                    });
                                });

                            // If we failed to add the show
                            }).catch(err => {
                                lock.leave(token);
                            });

                        } else if (type === 'SUBTITLE') {
                            await t.addSubtitleIfNotSaved(showName, path, showPath, seasonNumber, episodeNumber);
                            lock.leave(token);
                        }
                    }
                });
            }

        });
    }

    async removeSeasonIfNoEpisodes(serieId, seasonNumber, seasonPath) {
        return new Promise(async (resolve, reject) => {
            db.any('SELECT * FROM serie_episode WHERE serie_id = $1 AND season_number = $2', [serieId, seasonNumber]).then(async (result) => {
                if (result.length === 0) {
                    await db.none('DELETE FROM serie_season WHERE serie_id = $1 AND season_number = $2 AND path = $3', [serieId, seasonNumber, seasonPath]);
                    await db.none('DELETE FROM serie_season_metadata WHERE serie_id = $1 AND season_id = $2', [serieId, seasonNumber]);
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    async removeShowIfNoSeasons(serieId) {
        return new Promise(async (resolve, reject) => {
            db.any('SELECT * FROM serie_season WHERE serie_id = $1', [serieId]).then(async (result) => {
                if (result.length === 0) {
                    await db.none('DELETE FROM serie WHERE id = $1', [serieId]).then(result => {
                        resolve(true);
                    });
                } else {
                    resolve(false);
                }
            });
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

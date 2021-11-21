const db = require('../db');
const Content = require('./Content');
const Logger = require('../logger');
const logger = new Logger().getInstance();
const path = require('path');

class Episode extends Content {
    #episodeId;
    constructor(episodeId) {
        super();
        this.#episodeId = episodeId;
    }

    // TODO: Should probably be in baseclass "Content"
    get id() {
        return this.#episodeId;
    }


    getFilePath() {
        return new Promise((resolve, reject) => {
            db.one(`SELECT DISTINCT serie_episode.path AS subpath, library.path AS basepath FROM serie_episode
            INNER JOIN serie
            ON serie.id = serie_episode.serie_id

            INNER JOIN library
            ON serie.library = library.id

            WHERE serie_episode.id = $1`, [this.#episodeId])
            .then(result => {
                resolve(`${result.basepath}${result.subpath}`);
            })
            .catch(error => {
                console.log(error);
                reject()
            })
        });
    }

    getResolutions() {
        return new Promise((resolve, reject) => {
            db.one('SELECT "240p", "360p", "480p", "720p", "1080p", "1440p", "4k", "8k", "codec" FROM serie_episode_resolution WHERE episode_id = $1', [this.#episodeId]).then(result => {
                resolve(result);
            }).catch(error => {
                logger.ERROR(`Error getting episode resolution: ${error}`);
                reject();
            });
        });
    }

    getSubtitles() {
        return new Promise((resolve, reject) => {
            db.any('SELECT id, language, synced, extracted FROM serie_episode_subtitle WHERE episode_id = $1', [this.#episodeId]).then(subtitles => {
                resolve(subtitles);
            });
        });
    }

    getAudioCodecs() {
        throw new Error('Not implemented');
    }

    getAudioCodecByStreamIndex(streamIndex) {
        return new Promise((resolve, reject) => {
            db.one("SELECT language, codec, stream_index FROM serie_episode_language WHERE serie_episode_id = $1 AND stream_index = $2", [this.#episodeId, streamIndex]).then(result => {
                resolve(result);
            })
            .catch(error => {
                logger.ERROR(`Error getting episode codec ${streamIndex}: ${error}`);
            });
        });
    }

    getInfoFromInternalEpisodeId() {
        return new Promise((resolve, reject) => {
            db.one('SELECT serie_id, episode, season_number FROM serie_episode WHERE id = $1', [this.#episodeId]).then(result => {
                resolve(result);
            }).catch(error => {
                logger.ERROR(`Error getting episode info: ${error}`);
                reject();
            });
        });
    }

    isDirectplayReady() {
        return new Promise((resolve, reject) => {
            this.getInfoFromInternalEpisodeId().then(result => {
                db.one("SELECT directplay_ready FROM serie_episode_metadata WHERE episode_number = $1 AND season_number = $2 AND serie_id = $3", [result.episode, result.season_number, result.serie_id]).then(result => {
                    resolve(result.directplay_ready);
                }).catch(error => {
                    logger.ERROR(`Error getting directplay status: ${error}`);
                    reject();
                });
            });
        });
    }

    async getM3u8Path() {
        const videoPath = await this.getFilePath();
        const videoFolder = path.parse(videoPath).dir;
        const fileName = path.parse(videoPath).name + '.m3u8';
        const m3u8Path = path.join(videoFolder, fileName);
        return m3u8Path;
    }
}

module.exports = Episode;
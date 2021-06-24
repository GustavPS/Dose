const db = require('../../../../lib/db');
const LANGUAGES_LIST = require('../../../../lib/languages');
const cors = require('../../../../lib/cors');
const validateUser = require('../../../../lib/validateUser');
const ORDERBY = [
  'id',
  'added_date',
  'release_date',
  'popularity'
];
var ffmpeg = require('fluent-ffmpeg');


export default (req, res) => {
    return new Promise(async (resolve, reject) => {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Headers', "*");

        let token = req.query.token;
        if (!validateUser(token)) {
            res.status(403).end();
            resolve();
            return;
        }

        let type = req.query.type;
        if (!['movie', 'serie'].includes(type)) {
            res.status(404).end();
            resolve();
            return;
        }

        // TODO: Error handling
        let languages = [];
        if (type === 'movie') {
            languages = await getMovieLanguages(req.query.id);
        } else if (type === 'serie') {
            languages = await getEpisodeLanguages(req.query.id);
        }

        let returnList = [];
        // Find the "long name" of the languages
        for (let lang of languages) {
            let beforeLength = returnList.length;
            for (let lang2 of LANGUAGES_LIST) {
                if (lang2.shortName === lang.language) {
                    returnList.push({
                        shortName: lang.language,
                        longName: lang2.longName,
                        id: parseInt(lang.id),
                        stream_index: lang.stream_index
                    });
                    break;
                }
            }

            // If we didn't find the language, add it as unknown
            if (beforeLength === returnList.length) {
                returnList.push({
                    shortName: 'unknown',
                    longName: 'Unknown',
                    id: -1,
                    stream_index: lang.stream_index
                });
            }
        }
        res.status(200).json(returnList);
        resolve();
    
    });
}


function getEpisodeLanguages(episodeID) {
    return new Promise(resolve => {
        db.any('SELECT language, id, stream_index FROM serie_episode_language WHERE serie_episode_id = $1', [episodeID]).then(result => {
            resolve(result);
        });
    });
}

function getMovieLanguages(movieID) {
    return new Promise(resolve => {
        db.any('SELECT language, id, stream_index FROM movie_language WHERE movie_id = $1', [movieID]).then(result => {
            console.log(result);
            resolve(result);
        });
    });
}
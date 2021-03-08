const db = require('../../../lib/db');
const OS = require('opensubtitles-api');
const pathLib = require('path');
const validateUser = require('../../../lib/validateUser');

const OpenSubtitles = new OS({
    useragent: 'TemporaryUserAgent',
    username: 'vezel',
    password: 'Pluto971005321',
    ssl: true
});

export default (req, res) => {
    return new Promise(async (resolve) => {
        let type = req.query.type;
        let id = req.query.id;

        let token = req.query.token;
        if (!validateUser(token)) {
            res.status(403).end();
            resolve();
            return;
        }

        let path = undefined;
        if (type === 'movie') {
            path = await getMoviePathAndName(id);
        }

        if (path === undefined) {
            res.status(404).end();
            resolve();
            return;
        }

        if (type === 'movie') {
            getFileHash(path)
            .then(info => {
                console.log(path);
                OpenSubtitles.search({
                    sublanguageid: 'eng',
                    hash: info.moviehash,
                    filesize: info.moviebytesize,
                    path: path,
                    filename: pathLib.basename(path),
                    extensions: ['srt', 'vtt']
                }).then(subtitles => {
                    console.log(subtitles);
                })
            });
        }
    });
}

function getFileHash(path) {
    return new Promise(resolve => {
        OpenSubtitles.hash(path)
        .then(info => {
            resolve(info);
        });
    });
}



function getMoviePathAndName(movieID) {
    return new Promise((resolve, reject) => {
        db.one(`SELECT i.name, i.path AS subpath, library.path AS basepath FROM library 
                INNER JOIN movie i
                ON i.library = library.id AND i.id = $1
              `, [movieID]).then((result) => {
                resolve(`${result.basepath}${result.subpath}`)
        });
    });
  }
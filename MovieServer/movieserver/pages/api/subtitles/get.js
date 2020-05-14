const db = require('../../../lib/db');
const ORDERBY = [
  'id',
  'added_date',
  'release_date',
  'popularity'
];
const fs = require('fs');
const path = require('path');
var ffmpeg = require('fluent-ffmpeg');
var crypto = require("crypto");


export default (req, res) => {
    return new Promise((resolve) => {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Headers', "*");

        let subtitleID = req.query.id;
        let offset = req.query.start ? req.query.start : 0;
        let minutes = Math.floor(offset / 60);
        let hours = Math.floor(minutes / 60);
        minutes -= hours * 60;
        let seconds = offset % 60;

        getSubtitlePath(subtitleID)
        .then(subPath => {
            let folderName = path.dirname(subPath);
            let output = path.join(folderName, crypto.randomBytes(20).toString('hex')+'.vtt');
    
            // Transcode the subtitle to vtt, with offset according the variables hours, minutes and seconds
            ffmpeg(subPath)
            .outputOptions([
                `-ss ${hours}:${minutes}:${seconds}`
            ])
            .output(output)
            .on('end', function() {
                console.log(`Converted subtitle with ${hours} hours, ${minutes} minutes and ${seconds} seconds offset`)
                // Read the new subtitle file and send it to the user
                fs.readFile(output, (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.status(200).send(data);
                    // Remove the new subtitle file
                    fs.unlink(output, () => {});
                    resolve();
                });
            })
            .on('error', (err, stdout, stderr) => {
                console.log(err);
                console.log(stdout);
                console.log(stderr);
            })
            .run()
        })
        .catch(error => {
            // This happens if we didn't find the subtitle by ID, send 404.
            if (error === 404) {
                res.status(404).end();
                resolve();
            } else {
                throw(error);
            }

        });
    });
    
}

function getSubtitlePath(subtitleID) {
    return new Promise((resolve, reject) => {
            db.one(`SELECT subtitle.path AS subtitle_path, library.path AS library_path FROM library 
        INNER JOIN subtitle
        ON subtitle.library_id = library.id AND subtitle.id = $1`, [subtitleID])
        .then(result => {
            let path = result.library_path + result.subtitle_path;
            resolve(path);
        }).catch(error => {
            reject(404);
        })

    });
}
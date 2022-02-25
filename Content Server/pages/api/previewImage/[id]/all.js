const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const validateUser = require('../../../../lib/validateUser');
const fs = require('fs');
const path = require('path');
const Logger = require('../../../../lib/logger');
const logger = new Logger();

export default async (req, res) => {
    return new Promise(async (resolve, reject) => {
      res.setHeader('Access-Control-Allow-Origin', "*");
      res.setHeader('Access-Control-Allow-Headers', "*");

      let token = req.query.token;
      let id = req.query.id;
      let type = req.query.type;
      if (!validateUser(token)) {
          res.status(403).end();
          return;
      }

      console.log(type)
      if (type == "movie") {
        getMoviePath(id).then((movie_path) => {
          const dir = path.dirname(movie_path) + "/preview_images"
          let response_array = []
          console.log(dir)
          fs.readdir(dir, (err, files) => {
            if(files != undefined && files.length > 0) {
              for(let file of files) {
                response_array.push(base64_encode(path.join(dir, file)))
              }
            }
            res.status(200).json(response_array);
            
    
          });
  
        });
      } else {
        getEpisodeData(id).then((data) => {
          const dir = path.dirname(path.join(data.basepath, data.subpath)) + "/preview_images/e" + data.episode_number
          let response_array = []
          console.log(dir)
          fs.readdir(dir, (err, files) => {
            if(files != undefined && files.length > 0) {
              for(let file of files) {
                response_array.push(base64_encode(path.join(dir, file)))
              }
            }
            res.status(200).json(response_array);
          });
  
        });
      }
    
      });
    // function to encode file data to base64 encoded string
    function base64_encode(file) {
        // read binary data
        var bitmap = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        return new Buffer(bitmap).toString('base64');
    }

    function getEpisodeData(showID) {
        return new Promise((resolve, reject) => {
      
          db.one(`SELECT DISTINCT serie_episode.episode AS episode_number, serie_episode.path AS subpath, library.path AS basepath FROM serie_episode
                  INNER JOIN serie
                  ON serie.id = serie_episode.serie_id
      
                  INNER JOIN library
                  ON serie.library = library.id
      
                  WHERE serie_episode.id = $1
          `, [showID]).then(result => {
            resolve(result);
          }).catch(error => {
            reject();
          });
        });
      }

    function getMoviePath(movieID) {
      return new Promise((resolve, reject) => {
        db.one(`SELECT movie.path AS subpath, library.path AS basepath FROM library 
                INNER JOIN movie
                ON movie.library = library.id AND movie.id = $1
              `, [movieID]).then((result) => {
                resolve(`${result.basepath}/${result.subpath}`)
              }).catch(error => {
                reject();
              });
    });
    }
}
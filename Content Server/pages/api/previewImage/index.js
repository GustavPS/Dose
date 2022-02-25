const db = require('../../../lib/db');
const cors = require('../../../lib/cors');
const validateUser = require('../../../lib/validateUser');
const fs = require('fs');
const path = require('path');
const Logger = require('../../../lib/logger');
const logger = new Logger();

export default async (req, res) => {
    return new Promise(async (resolve, reject) => {
      res.setHeader('Access-Control-Allow-Origin', "*");
      res.setHeader('Access-Control-Allow-Headers', "*");

      let token = req.query.token;
      let id = req.query.id;
      let season = req.query.season;
      let episode = req.query.episode;
      let type = req.query.type;
      if (!validateUser(token)) {
          res.status(403).end();
          return;
      }

      let imageCount;
      if (type === 'MOVIE') {
        // TODO fix me
        
        //file = await getShowPreviewImages(id);
      } else {
        imageCount = await getShowPreviewImages(id, season, episode);
      }


      res.status(200).json({"total_preview_images": imageCount});

    });
}

async function getShowPreviewImages(id, season_number, episode_number) {
  return new Promise(async (resolve) => {
      let imagePath = ""
      await db.one(`SELECT serie_episode.path AS subpath, library.path AS basepath FROM library 
              INNER JOIN serie_episode
              ON serie_episode.serie_id = $1 AND serie_episode.season_number = $2 AND serie_episode.episode = $3
            `, [id, season_number, episode_number]).then((result) => {
              imagePath = path.join(result.basepath, result.subpath);
      }).catch(error => {
        resolve(0)
      });
      if(imagePath != "") {
        console.log(path.dirname(imagePath) + "/preview_images/e" + episode_number);
        const dir = path.dirname(imagePath) + "/preview_images/e" + episode_number
  
        fs.readdir(dir, (err, files) => {
  
          console.log(files.length);
          resolve(files.length)
        });
      } 
      
  });
}
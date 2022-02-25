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
      let show_id = req.query.show_id;
      let image_id = req.query.image_id;
      let season = req.query.season;
      let episode = req.query.episode;
      let type = req.query.type;
      if (!validateUser(token)) {
          res.status(403).end();
          return;
      }

      let preview_dir;
      if (type === 'MOVIE') {
        // TODO fix me
        
        //file = await getShowPreviewImages(id);
      } else {
        preview_dir = await getShowPreviewImages(show_id, season, episode);
      }


      var filePath = path.join(preview_dir, 'img' + zeroPad(image_id, 4) + ".jpg");
      var stat = fs.statSync(filePath);

      res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Content-Length': stat.size
      });

      var readStream = fs.createReadStream(filePath);
      // We replaced all the event handlers with a simple call to readStream.pipe()
      readStream.pipe(res);

    });
}

const zeroPad = (num, places) => String(num).padStart(places, '0')


async function getShowPreviewImages(id, season_number, episode_number) {
  return new Promise(async (resolve) => {
      let episodePath = ""
      await db.one(`SELECT serie_episode.path AS subpath, library.path AS basepath FROM library 
              INNER JOIN serie_episode
              ON serie_episode.serie_id = $1 AND serie_episode.season_number = $2 AND serie_episode.episode = $3
            `, [id, season_number, episode_number]).then((result) => {
                episodePath = path.join(result.basepath, result.subpath);
      }).catch(error => {
        console.log(error)
        resolve("")
      });
      if(episodePath != "") {
        const dir = path.dirname(episodePath) + "/preview_images/e" + episode_number
        
        console.log(dir);
        resolve(dir)
      } 
      
  });
}
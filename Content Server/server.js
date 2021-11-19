const http = require('http')
const { parse } = require('url')
const next = require('next')
const Watcher = require('./lib/watcher');
const MovieLibrary = require('./lib/library/movieLibrary');
const MovieMetadata = require('./lib/metadata/movieMetadata');
const Transcoding = require('./lib/hls/transcoding');
const HlsManager = require('./lib/hls/HlsManager');
const fs = require("fs");
const fsExtra = require('fs-extra');

const port = parseInt(process.env.PORT || '3001', 10);
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler();
const Logger = require('./lib/logger');
const logger = new Logger().getInstance();

const sockets = require('./sockets');
const express = require('express');

const getSegment = require('./pages/api/video/[id]/hls/[quality]/segments/[segment]');

var crypto = require('crypto');

console.log(`######                       
#     #  ####   ####  ###### 
#     # #    # #      #      
#     # #    #  ####  #####  
#     # #    #      # #      
#     # #    # #    # #      
######   ####   ####  ######  `);
console.log("\n\n");

if (dev) {
  logger.WARNING("Server running in development mode");
}


function startWebServer() {
  nextApp.prepare().then(async() => {
    const expressApp = express();
    const server = http.createServer(expressApp);
    sockets.connect(server);

    /**
     * Setup regular express API endpoint to the HLS segment endpoint since
     * nextJS will remove support for API-endpoints with more than 4MB responses in the future.
     */
    expressApp.get('/api/video/:id/hls/:quality/segments/:segment', async (req, res) => {
      getSegment(req, res);
    });
    // Setup regular nextJS endpoints
    expressApp.all('*', (req, res) => nextHandler(req, res));


    server.listen(port, () => {
      logger.INFO(`Ready on port ${port}`);

      updateMovies();
      setInterval(updateMovies, 43200000); // 12 hours
      setInterval(stopTranscodings, 2000); // 15 seconds
    });
  });
}

// Setup timer for getting popular movies
const updateMovies = () => {
  const metadataObj = new MovieMetadata();
  metadataObj.getBadImages()
  .then(async (movies) => {
    logger.INFO(`Updating movie images`);
    for (let movie of movies) {
      await metadataObj.updateImages(
              movie.title,
              movie.movie_id,
              movie.tmdb_id,
              !movie.found_good_poster,
              !movie.found_good_backdrop,
              !movie.found_food_logo);
    }
  });

  metadataObj.getPopularMovies()
  .then(movies => {
    logger.INFO(`Updating popular movies`);
    logger.INFO(`Found ${movies.length} popular movie(s)`);
    metadataObj.updatePopularMovies(movies);
  });
};


const removeTempFolder = () => {
  fsExtra.emptyDirSync(Transcoding.TEMP_FOLDER);
}
removeTempFolder();

// Setup timer for stopping old transcoding jobs
const stopTranscodings = () => {
  const hlsManager = new HlsManager();
  hlsManager.stopOldTranscodings();
}


const watcher = new Watcher();

// Generate webtoken secret
logger.DEBUG(`Generating token before starting..`);
crypto.randomBytes(256, function(ex, buf) {
  if (ex) throw ex;
  process.env.SECRET = buf;
  logger.DEBUG("Done");

  watcher.init(() => {
    watcher.startWatcher();
    startWebServer();
  })
});

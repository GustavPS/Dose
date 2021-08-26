const http = require('http')
const { parse } = require('url')
const next = require('next')
const Watcher = require('./lib/watcher');
const MovieLibrary = require('./lib/library/movieLibrary');
const MovieMetadata = require('./lib/metadata/movieMetadata');
const fs = require("fs");

const port = parseInt(process.env.PORT || '3001', 10);
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler();
const Logger = require('./lib/logger');
const logger = new Logger().getInstance();

const sockets = require('./sockets');
const express = require('express');

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

    expressApp.all('*', (req, res) => nextHandler(req, res));

    server.listen(port, () => {
      logger.INFO(`Ready on port ${port}`);

      updatePopularMovies();
      setInterval(updatePopularMovies, 43200000); // 12 hours
    });
  });
}

// Setup timer for getting popular movies
const updatePopularMovies = () => {
  logger.INFO(`Updating popular movies`);
  const metadataObj = new MovieMetadata();
  metadataObj.getPopularMovies()
  .then(movies => {
    logger.INFO(`Found ${movies.length} popular movie(s)`);
    metadataObj.updatePopularMovies(movies);
  });
};




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

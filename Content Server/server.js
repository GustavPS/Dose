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
const path = require('path');

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
const Movie = require('./lib/media/Movie');
const Episode = require('./lib/media/Episode');
const TvMetadata = require('./lib/metadata/tvMetadata');
let directplayPreparationRunning = false;

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
    nextApp.prepare().then(async () => {
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

            startDirectplayPreparation();
            setInterval(startDirectplayPreparation, 600000) // 10 minutes   600000
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

const startDirectplayPreparation = async () => {
    if (!directplayPreparationRunning) {
        directplayPreparationRunning = true;
        const showMetadata = new TvMetadata();
        await prepareDirectplay(showMetadata);
        const movieMetadata = new MovieMetadata();
        await prepareDirectplay(movieMetadata);
        directplayPreparationRunning = false;
    }
};

const prepareDirectplay = (metadata) => {
    return new Promise(resolve => {
        const isMovie = metadata.getType() === "movie";
        metadata.getDirectplayHandlingNeeded()
        .then(async candidates => {
            const hlsManager = new HlsManager();
            logger.INFO(`Preparing ${candidates.length} file(s) for directplay (type: ${metadata.getType()})`);
            while (candidates.length > 0) {
                const promises = [];
                // Create m3u8 files for each candidate, max SIMULTANEOUS_DIRECTPLAY_PREPARE_LIMIT at a time
                for (let i = 0; i < Transcoding.SIMULTANEOUS_DIRECTPLAY_PREPARE_LIMIT && candidates.length > 0; i++) {
                    const dbObject = candidates.pop();
                    const content = isMovie ? new Movie(dbObject.movie_id) : new Episode(dbObject.episode_id);
                    promises.push(hlsManager.prepareDirectplay(content));
                }
                const files = await Promise.all(promises);
    
                // Save that we have prepared the files and move the m3u8 file to the correct folder
                for (let file of files) {
                    metadata.setDirectplayReady(file.id);
                    const content = isMovie ? new Movie(file.id) : new Episode(file.id);
                    const m3u8Path = await content.getM3u8Path();
                    fs.copyFileSync(file.hlsFile, m3u8Path); // Move the m3u8 file to the content folder
                    fs.rmSync(file.output, {recursive: true, force: true}); // Remove the output folder (the transcoding)
                }
                logger.DEBUG(`Finished preparing ${files.length} file(s) for directplay, ${candidates.length} file(s) left`);
            }
            logger.INFO(`Finished preparing all files for directplay`);
            resolve();
        });
    });
}

const watcher = new Watcher();

// Generate webtoken secret
logger.DEBUG(`Generating token before starting..`);
crypto.randomBytes(256, function (ex, buf) {
    if (ex) throw ex;
    process.env.SECRET = buf;
    logger.DEBUG("Done");

    watcher.init(() => {
        watcher.startWatcher();
        startWebServer();
    })
});

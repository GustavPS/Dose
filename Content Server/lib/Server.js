/**
 * The required modules are loaded at the approriate time inside the class and stored in these variables.
 */
let http;
let express;
let crypto;
let Config;
let Logger;
let sockets;
let next;
let JobHandler;
let LibraryEventEmitter;
let Watcher;
let TvLibrary;
let MovieLibrary;
let getSegment;
let logger;

class Server {
    constructor(port, dev) {
        this.loadRequiredSetupModules();
        this.dev = dev;
        if (dev) {
            logger.WARNING("Server running in development mode");
        }

        this.port = port;
        this.setupDone = false;

        // ExpressJs
        this.expressApp = express();
        this.server = http.createServer(this.expressApp);

        // NextJs
        this.nextApp = next({ dev });
        this.nextHandler = this.nextApp.getRequestHandler();
        sockets.connect(this.server);

        this.handleNewLibraries = this.handleNewLibraries.bind(this);
        this.handleSetupDone = this.handleSetupDone.bind(this);

        this.watcher;
    }

    /**
     * Loads the required modules for the setup
     */
    loadRequiredSetupModules() {
        http = require('http')
        express = require('express');
        crypto = require('crypto');
        Config = require("./config");
        Logger = require('./logger');
        logger = new Logger();
        next = require('next');
        LibraryEventEmitter = require('./events/CommonEvent.js');
        sockets = require('../sockets');
    }

    /**
     * Loads the required modules for the server
     */
    loadRequiredModules() {
        this.loadRequiredSetupModules();
        JobHandler = require('./jobs/JobHandler');
        Watcher = require('./watcher');
        TvLibrary = require('./library/tvLibrary');
        MovieLibrary = require('./library/movieLibrary');
        getSegment = require('../pages/api/video/[id]/hls/[quality]/segments/[segment]');
    }

    /**
     * Add the libraries to the active watcher and start watching for changes
     * 
     * @param {Json} libraries - The libraries to handle 
     */
    handleNewLibraries(libraries) {
        logger.DEBUG(`${libraries.length} new libraries added`);
        for (let i = 0; i < libraries.length; i++) {
            const library = libraries[i];

            if (library.type.toLowerCase() === 'movies') {
                const movieLibrary = new MovieLibrary(library.name, library.path, library.id);
                this.watcher.addLibrary(movieLibrary);
                this.watcher.watch(movieLibrary);
            } else if (library.type.toLowerCase() === 'series') {
                const tvLibrary = new TvLibrary(library.name, library.path, library.id);
                this.watcher.addLibrary(tvLibrary);
                this.watcher.watch(tvLibrary);
            }
        }
    }

    /**
     * Start the full server
     */
    handleSetupDone() {
        if (!this.setupDone) {
            logger.INFO(`Setup done!`);
            this.setupDone = true;
            this.loadRequiredModules();
            this.configureAllEndpoints();
            this.createWatcher();
            this.startWatcher();
        }
    }

    /**
     * Setup various event listeners
     */
    setupEventListeners() {
        LibraryEventEmitter.on('library.new', this.handleNewLibraries);
        LibraryEventEmitter.on('setup.done', this.handleSetupDone);
    }

    /**
     * Checks if the config file specified that the server is fully configured
     */
    isSetupDone() {
        return new Promise(resolve => {
            if (!Config.doesConfigExist()) {
                Config.createConfig()
                .then(() => {
                    resolve(false);
                });
            } else {
                const config = new Config();
                config.isSetupDone()
                .then(isSetupDone => {
                    resolve(isSetupDone);
                });
            }
        });
    }

    /**
     * Generate a random string of characters (the webtoken secret)
     * 
     * @returns {Promise} A promise that resolves to the webtoken
     */
    generateWebtoken() {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(256, (ex, buf) => {
                if (ex) throw ex;
                logger.DEBUG(`Generated webtoken!`);
                resolve(buf);
            })
        });
    }

    /**
     * Prepare the nextJs server
     * 
     * @returns {Promise} A promise that resolves when the nextApp is ready
     */
    prepareNextApp() {
        return new Promise(resolve => {
            this.nextApp.prepare()
            .then(() => {
                resolve();
            });
        });
    }

    /**
     * Configure the setup endpoints
     */
    configureSetupEndpoints() {
        this.expressApp.all('/api/dashboard/setup/*', (req, res) => this.nextHandler(req, res));
        this.expressApp.all('/api/dashboard/libraries/*', (req, res) => this.nextHandler(req, res));
        this.expressApp.all('/dashboard/setup/*', (req, res) => this.nextHandler(req, res));
        this.expressApp.all('/_next/*', (req, res) => this.nextHandler(req, res));
        this.expressApp.all('/api/requests/*', (req, res) => this.nextHandler(req, res));
        this.expressApp.all('/', (req, res) => res.redirect('/dashboard/setup/database'));
        this.expressApp.all('/dashboard', (req, res) => res.redirect('/dashboard/setup/database'));
    }

    /**
     * Configure all the endpoints
     */
    configureAllEndpoints() {
        /**
         * Setup regular express API endpoint to the HLS segment endpoint since
         * nextJS will remove support for API-endpoints with more than 4MB responses in the future.
         **/
        this.expressApp.get('/api/video/:id/hls/:quality/segments/:segment', async (req, res) => {
            getSegment(req, res);
        });
        this.expressApp.all('*', (req, res) => this.nextHandler(req, res));
    }

    /**
     * Starts the library watcher
     */
    startWatcher() {
        this.watcher.init(() => {
            this.watcher.startWatcher();
        });
    }

    createWatcher() {
        this.watcher = new Watcher();
    }

    start() {
        const promises = [this.isSetupDone(), this.prepareNextApp(), this.generateWebtoken(), this.generateWebtoken()];
        Promise.all(promises)
        .then(result => {
            const isSetupDone = result[0];
            const webToken = result[2];
            const dashToken = result[3]; // Web token for the dashboard

            if (this.dev) {
                logger.WARNING(`Using hardcoded webtokens`);
                process.env.SECRET = "abc";
                process.env.DASHBOARD_SECRET = "def";
            } else {
                process.env.SECRET = webToken;
                process.env.DASHBOARD_SECRET = dashToken;
            }

            this.setupDone = isSetupDone;
            if (isSetupDone) {
                this.loadRequiredModules();
                this.configureAllEndpoints();
            } else {
                logger.WARNING("Setup not done, only starting setup endpoints");
                this.configureSetupEndpoints();
            }

            this.server.listen(this.port, () => {
                logger.INFO(`Server started on port ${this.port}`);
                this.setupEventListeners();
                if (isSetupDone) {
                    this.createWatcher();
                    this.startWatcher();
                    const jobHandler = new JobHandler();
                    jobHandler.startAllJobs();
                }
            })

        });
    }
}

module.exports = Server;
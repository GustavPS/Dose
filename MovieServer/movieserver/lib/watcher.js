const chokidar = require('chokidar');
const db = require('./db');
const path = require('path');
const pathExists = require('path-exists');
const MovieLibrary = require('./library/movieLibrary');
const TvLibrary = require('./library/tvLibrary');


class Watcher {
    /**
     * Initialize the watcher object
     * 
     * @param {String} libraries - A list of movie/tv libraries.
     */
    constructor(libraries = []) {
        this.libraries = libraries;
        this.initialized = false;
    }

    /**
     * Initiate the class
     * 
     * @param {Function} cb - The function to be called after the class is initialized.
     */
    async init(cb) {
        await this.syncDatabase();
        await this.fetchLibraries();
        this.initialized = true;
        cb();

    }

    isInitialized() {
        return this.initialized;
    }

    /**
     * Checks if all the movies/libraries in the database exist in the file system.
     */
    async syncDatabase() {
        console.log("Syncing database..");
        const libraries = await db.any("SELECT * FROM library");
        for (const library of libraries) {
            let exist = await pathExists(library.path);
            if (!exist) {
                console.log(`Can't find ${library.name} (${library.path}), removing from the database.`);
                await db.none('DELETE FROM movie WHERE library = $1', [library.id]);
                await db.none('DELETE FROM library WHERE id = $1', [library.id]);
            }
        }

        const movies = await db.any("SELECT movie.path AS movie_path, movie.name AS movie_name, movie.id AS movie_id, library.path AS library_path, library.id AS library_id FROM movie, library WHERE movie.library = library.id");
        for (const movie of movies) {
            if (movie.movie_name === null) {
                movie.movie_name = "";
            }
            let exist = await pathExists(movie.library_path + movie.movie_path);
            if (!exist) {
                console.log(`Can't find ${movie.movie_name} (${movie.library_path + movie.movie_path}), removing from the database.`);
                await db.none('DELETE FROM movie WHERE id = $1', [movie.movie_id]);
            }
        }

        console.log(" > Done syncing database!");
    }

    /**
     * Get all the libraries that is saved in the database
     */
    async fetchLibraries() {
        const movieLibraries = await db.any("SELECT * FROM library WHERE type = 'MOVIES'");
        const tvLibraries = await db.any("SELECT * FROM library WHERE type = 'TV'");
        console.log('Movie libraries:')
        console.table(movieLibraries);
        console.log('TV lirbaries:')
        console.table(tvLibraries);

        movieLibraries.forEach(library => {
            this.libraries.push(new MovieLibrary(library.name, library.path, library.id));
        });
        tvLibraries.forEach(library => {
            this.libraries.push(new TvLibrary(library.name, library.path, library.id));
        });
        
    }

    /**
     * Start watching for file changes
     * 
     * @param {Library} library - The library to watch for changes
     */
    watch(library) {
        if (!this.isInitialized()) throw ('Class is not initialized.');
        
        let relativePath = path.relative(process.cwd(), library.getPath());
        chokidar.watch(relativePath, {
          awaitWriteFinish: true,
          ignoreInitial: false
        })
        .on('add', (filePath, event) => {
            filePath = filePath.substring(filePath.indexOf("/") + 1);
            filePath = filePath.substring(filePath.indexOf("\\") + 1);
            library.newEntry(filePath);
        })
        .on('unlink', (filePath) => {
            filePath = filePath.substring(filePath.indexOf("/") + 1);
            filePath = filePath.substring(filePath.indexOf("\\") + 1);
            library.removeEntry(filePath);
        })
        .on('error', error => {
            console.log(`File system watcher error: ${error}`);
        })
        .on('ready', () => {
            console.log(` > Watching ${relativePath} for changes`);
        });
    }

    /**
     * Watch for file changes in the provided libraries
     */
    startWatcher() {
        if (!this.isInitialized()) throw ('Class is not initialized.');
        console.log("Starting file watcher..");
        this.libraries.forEach(library => {
            this.watch(library);
        });
    }
}

module.exports = Watcher;
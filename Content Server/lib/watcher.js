const chokidar = require('chokidar');
const db = require('./db.js');
const path = require('path');
const pathExists = require('path-exists');
const MovieLibrary = require('./library/movieLibrary');
const TvLibrary = require('./library/tvLibrary');
const readline = require('readline');
const Logger = require('./logger');
const logger = new Logger();


class Watcher {
    static IGNORED_FILE_ENDINGS = ['.m3u8', '.jpg'];
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

    /**
     * Returns true if the class is initialized, false otherwise.
     */
    isInitialized() {
        return this.initialized;
    }

    /**
     * Checks if all the movies/libraries in the database exist in the file system.
     * If it does not exist it will remove the entries in the database, along with the metadata
     * for that entry.
     */
    async syncDatabase() {
        logger.INFO("Syncing database..");
        const libraries = await db.any("SELECT * FROM library");
        const libLenght = libraries.length;
        let index = 1;
        for (const library of libraries) {
            readline.cursorTo(0);
            process.stdout.write(`\x1b[36m > Checking Library ${index}/${libLenght}`);
            let exist = await pathExists(library.path);
            if (!exist) {
                logger.INFO(`Can't find ${library.name} (${library.path}), removing from the database.`);
                await db.none('DELETE FROM movie WHERE library = $1', [library.id]);
                await db.none('DELETE FROM library WHERE id = $1', [library.id]);
            }
            index++;
        }
        if (libLenght > 0) {
            process.stdout.write("\n");
        }

        const movies = await db.any("SELECT movie.path AS movie_path, movie.name AS movie_name, movie.id AS movie_id, library.path AS library_path, library.id AS library_id FROM movie, library WHERE movie.library = library.id");
        const movieLenght = movies.length;
        index = 1;
        for (const movie of movies) {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`\x1b[36m > Checking Movie ${index}/${movieLenght}\x1b[0m`);
            if (movie.movie_name === null) {
                movie.movie_name = "";
            }
            let exist = await pathExists(path.join(movie.library_path, movie.movie_path));
            if (!exist) {
                logger.INFO(`Can't find ${movie.movie_name} (${movie.library_path + movie.movie_path}), removing from the database.`);
                await db.none('DELETE FROM movie WHERE id = $1', [movie.movie_id]);
            }
            index++;
        }

        if (movieLenght > 0) {
            process.stdout.write("\n");
        }

        // Check if all the tv show paths are still present in the filesystem
        const shows = await db.any("SELECT serie.path AS serie_path, serie.name AS serie_name, serie.id AS serie_id, library.path AS library_path, library.id AS library_id FROM serie, library WHERE serie.library = library.id");
        const showLength = shows.length;
        index = 1;
        for (const show of shows) {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`\x1b[36m > Checking Show ${index}/${showLength}\x1b[0m`);
            if (show.serie_name === null) {
                show.serie_name = "";
            }

            let exist = await pathExists(path.join(show.library_path, show.serie_path));

            if (!exist) {
                logger.INFO(`Can't find ${show.serie_name} (${show.library_path + show.serie_path}), removing from the database.`);
                await db.none('DELETE FROM serie WHERE id = $1', [show.serie_id]);
            }
            index++;
        }

        if (showLength > 0) {
            process.stdout.write("\n");
        }


        const subtitles = await db.any("SELECT subtitle.id AS subtitle_id, subtitle.path AS subtitle_path, subtitle.movie_id AS movie_id, subtitle.library_id AS library_id, library.path AS library_path, library.name AS library_name FROM subtitle, library WHERE subtitle.library_id = library.id");
        const subLength = subtitles.length;
        index = 1;
        for (const subtitle of subtitles) {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`\x1b[36m > Checking Subtitle ${index}/${subLength}\x1b[0m`);
            let exist = await pathExists(path.join(subtitle.library_path, subtitle.subtitle_path));
            if (!exist) {
                logger.INFO(`Can't find ${subtitle.subtitle_path} in library ${subtitle.library_name}, removing from the databse (${subtitle.library_path + subtitle.subtitle_path})`);
                await db.none('DELETE FROM subtitle WHERE id = $1', [subtitle.subtitle_id]);
            }
            index++;

        }

        if (subLength > 0) {
            process.stdout.write("\n");
        }
        logger.INFO("Done syncing database!");
    }

    /**
     * Get all the libraries that is saved in the database and save it in the libraries variable
     */
    async fetchLibraries(print=true) {
        const movieLibraries = await db.any("SELECT * FROM library WHERE type = 'MOVIES'");
        const tvLibraries = await db.any("SELECT * FROM library WHERE type = 'SERIES'");
        if (print && (movieLibraries.length > 0 || tvLibraries.length > 0)) {
            logger.INFO('Movie libraries:');
            console.table(movieLibraries);
            logger.INFO('TV libraries:');
            console.table(tvLibraries);
        } else if (print) {
            logger.INFO('No libraries found!');
        }

        movieLibraries.forEach(library => {
            this.libraries.push(new MovieLibrary(library.name, library.path, library.id));
        });
        tvLibraries.forEach(library => {
            this.libraries.push(new TvLibrary(library.name, library.path, library.id));
        });
    }

    /**
     * Add a new library to the watcher instance
     * 
     * @param {Library} library - The library to add (MovieLibrary or TvLibrary) 
     */
    addLibrary(library) {
        this.libraries.push(library);
    }


    cleanPath(filePath, libraryPath) {
        filePath = filePath.replace(libraryPath, "");
        filePath = filePath.substring(filePath.indexOf("/") + 1);
        filePath = filePath.substring(filePath.indexOf("\\") + 1);
        return filePath;
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
        .on('add', async (filePath, event) => {
            const extension = path.extname(filePath);
            if (!Watcher.IGNORED_FILE_ENDINGS.includes(extension)) {
                filePath = this.cleanPath(filePath, relativePath);
                if (library.getType() === 'SERIES') {
                    await library.newEntry(filePath);
                } else {
                    library.newEntry(filePath);
                }
            }
        })
        .on('unlink', (filePath) => {
            filePath = this.cleanPath(filePath, relativePath);
            library.removeEntry(filePath);
        })
        .on('addDir', filePath => {
        })
        .on('error', error => {
            logger.ERROR(`File system watcher error: ${error}`);
        })
        .on('ready', () => {
            logger.DEBUG(`Watching ${relativePath} for changes`);
        });
    }

    /**
     * Watch for file changes in the provided libraries
     */
    startWatcher() {
        if (!this.isInitialized()) throw ('Class is not initialized.');
        if (this.libraries.length > 0) {
            logger.DEBUG("Starting file watcher..");
        }
        this.libraries.forEach(library => {
            this.watch(library);
        });
    }
}

module.exports = Watcher;

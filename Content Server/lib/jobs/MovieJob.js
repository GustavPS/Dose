const Logger = require('../logger.js');
const MovieMetadata = require('../metadata/movieMetadata.js');
const Job = require('./Job.js');

const logger = new Logger();

class MovieJob extends Job {
    constructor(interval, runAtStart=false) {
        super(interval, runAtStart);
    }

    startJob() {
        if (this.runAtStart) {
            this.#runJob();
        }

        this.timer = setInterval(this.#runJob.bind(this), this.interval);
    }

    #runJob() {
        const metadata = new MovieMetadata();
        metadata.getBadImages()
        .then(async (movies) => {
            logger.INFO(`Updating movie images`);
            for (const movie of movies) {
                await metadata.updateImages(
                    movie.title,
                    movie.movie_id,
                    movie.tmdb_id,
                    !movie.found_good_poster,
                    !movie.found_good_backdrop,
                    !movie.found_good_logo);
            }
        });

        metadata.getPopularMovies()
        .then(movies => {
            logger.INFO(`Updating popular movies`);
            logger.INFO(`Found ${movies.length} popular movie(s)`);
            metadata.updatePopularMovies(movies);
        });
    }
}

module.exports = MovieJob;
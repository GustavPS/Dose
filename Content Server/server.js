const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const Watcher = require('./lib/watcher');
const MovieLibrary = require('./lib/library/movieLibrary');
const MovieMetadata = require('./lib/metadata/movieMetadata');
const fs = require("fs");


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();
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
  console.log("\x1b[33m", 'Server running in development mode');
  console.log("\x1b[0m", "")
}


function startWebServer() {
    //const httpsOptions = {
    //    key: fs.readFileSync("./certs/localhost.key"),
    //    cert: fs.readFileSync("./certs/localhost.crt"),
    //};
    app.prepare().then(() => {
        createServer((req, res) => {
          // Be sure to pass `true` as the second argument to `url.parse`.
          // This tells it to parse the query portion of the URL.
          const parsedUrl = parse(req.url, true)
          const { pathname, query } = parsedUrl
      
          if (pathname === '/a') {
            app.render(req, res, '/b', query)
          } else if (pathname === '/b') {
            app.render(req, res, '/a', query)
          } else {
            handle(req, res, parsedUrl)
          }
        }).listen(3001, err => {
          if (err) throw err
          console.log(' > Ready on http://localhost:4000')

          updatePopularMovies();
          setInterval(updatePopularMovies, 24 * 60 * 60 * 1000);
        })
      })
}

// Setup timer for getting popular movies
const updatePopularMovies = () => {
  console.log(` > Updating popular movies`);
  const metadataObj = new MovieMetadata();
  metadataObj.getPopularMovies()
  .then(movies => {
    console.log(` > Found ${movies.length} popular movie(s)`);
    metadataObj.updatePopularMovies(movies);
  });
};




const watcher = new Watcher();

// Generate webtoken secret
console.log("Generating token before starting..");
crypto.randomBytes(256, function(ex, buf) {
  if (ex) throw ex;
  process.env.SECRET = buf;
  console.log(" > Done\n");

  watcher.init(() => {
    watcher.startWatcher();
    startWebServer();
  })
});

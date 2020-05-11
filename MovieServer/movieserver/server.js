const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const Watcher = require('./lib/watcher');
const MovieLibrary = require('./lib/library/movieLibrary');


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

console.log(`######                       
#     #  ####   ####  ###### 
#     # #    # #      #      
#     # #    #  ####  #####  
#     # #    #      # #      
#     # #    # #    # #      
######   ####   ####  ######  `);
console.log("\n\n");

function startWebServer() {
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
        }).listen(4000, err => {
          if (err) throw err
          console.log('> Ready on http://localhost:4000')
        })
      })
}


const watcher = new Watcher();

watcher.init(() => {
  watcher.startWatcher();
  startWebServer();
})
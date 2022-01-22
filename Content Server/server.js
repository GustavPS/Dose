const Server = require('./lib/Server');
const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT || '3001', 10);

process.on('uncaughtException', function (err) {
    console.log(err);
    console.error(err.stack);
});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

console.log(`
######                       
#     #  ####   ####  ###### 
#     # #    # #      #      
#     # #    #  ####  #####  
#     # #    #      # #      
#     # #    # #    # #      
######   ####   ####  ######  \n`);

const server = new Server(port, dev);
server.start();
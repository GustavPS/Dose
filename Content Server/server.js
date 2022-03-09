const path = require('path');
const Server = require('./lib/Server');
const Test = require('./lib/Test');
const env = require('@next/env');

env.loadEnvConfig('./', process.env.NODE_ENV !== 'production');
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

if (process.env.TEST === 'TRUE') {
    const config = path.join(process.env.TEMP_DIRECTORY, 'config.json');
    const test = new Test(config);
    
    test.setupTestEnvironment().then(async () => {
        await test.createDummyUser();
        console.log('Test environment setup');
        server.start();
    })
} else {
    server.start();
}
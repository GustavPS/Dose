var socketIO = require('socket.io');
var io = null;

module.exports = {

    connect: function(server) {
        io = socketIO(server, { cors: { origin: '*' } });
    },

    emit: function(event, values) {
        if (io) {
            io.sockets.emit(event, values);
        }
    }
}
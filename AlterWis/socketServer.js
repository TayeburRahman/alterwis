const socketServer = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');
    });
};

module.exports = socketServer;
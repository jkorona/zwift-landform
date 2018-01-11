var socketIO = require('socket.io');

class WebSocketServer {


  start(app) {
    const io = socketIO(app);

    io.on('connection', (socket) => {
      console.log('a user connected');
    });

    return io;
  }

}

module.exports = WebSocketServer;

const { Component } = require('./connection/http/util/context/decorators');

@Component()
class WebSocketServer {

  constructor(connector) {
    this.connector = connector;

    this.connectedHandler = () => 0;
    this.disconnectedHandler = () => 0;
  }

  static create(connector) {
    return new WebSocketServer(connector);
  }

  start(app, onUserConnectedFn) {
    const io = this.connector(app);
    io.on('connection', (socket) => onUserConnectedFn(new SocketWrapper(socket)));

    return io;
  }

}

class SocketWrapper {

  constructor(socket) {
    this.socket = socket;
  }

  whenDisconnected(fn) {
    this.socket.on('disconnect', fn);
    return this;
  }

  onHandshake(fn) {
    this.socket.on('handshake', fn);
    return this;
  }

  send(name, data) {
    this.socket.emit(name, data);
    return this;
  }

}

module.exports = WebSocketServer;

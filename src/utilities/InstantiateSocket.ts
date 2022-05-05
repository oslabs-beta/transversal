export {};
const socketio = require('socket.io');

class InstantiateSocket {
  private io: any;

  constructor(server, origin) {
    this.io = socketio(server, {
      cors: {
        origin: origin,
      },
    });
  }

  openConnection(transversalJson) {
    this.io.on('connection', (socket) => {
      console.log('transversal connected: ', socket.id);
      socket.emit('transverse', transversalJson);
      socket.on('disconnect', (reason) => {
        console.log(reason);
      });
    });
  }
}

module.exports = InstantiateSocket;

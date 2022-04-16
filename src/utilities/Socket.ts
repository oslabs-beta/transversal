import { io } from 'socket.io-client';

class TransversalSocket {
  public socket: any;

  constructor(url) {
    this.socket = io(url);
  }

  getTransversalInstance(timeout = 10000) {
    return new Promise((resolve, reject) => {
      let timer;

      function responseHandler(data) {
        data = JSON.parse(data, (name, val) => {
          if (val && typeof val === 'string' && (val.startsWith('function') || val.startsWith('async'))) {
            return new Function('return ' + val)();
          } else {
            return val;
          }
        });
        resolve(data);
        clearTimeout(timer);
      }

      this.socket.on('connect', () => console.log(this.socket.id));

      this.socket.once('transverse', responseHandler);

      timer = setTimeout(() => {
        reject(new Error('Timeout waiting for response from the server'));
        this.socket.removeListener('transverse', responseHandler);
      }, timeout);
    });
  }
}

export default TransversalSocket;

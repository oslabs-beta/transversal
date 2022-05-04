export {};
const { io } = require('socket.io-client');

class TransversalClient {
  public socket: any;

  constructor(url) {
    this.socket = io(url);
  }

  getTransversalInstance(timeout: number = 10000): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let timer;

      function responseHandler(data: string) {
        data = JSON.parse(data, (name: string | undefined, val: string) => {
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

export default TransversalClient;

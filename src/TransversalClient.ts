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
        data = JSON.parse(data);
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
  async transversalQuery(gql, variables, cacheOption = false, custom) {
    if (custom) {
      const pattern = /^.+{$/gm;

      const queryString = pattern.exec(gql);
      const queryString2 = pattern.exec(gql);

      gql = queryString + '\n' + queryString2 + '\n' + custom + '\n' + '}' + '\n' + '}';
    }

    const request = async (endpoint, gql, variables) => {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: gql,
          variables: variables,
        }),
      })
        .then((res) => res.json())
        .then((data) => data);
      return res;
    };

    console.log('Checking cache option..!', gql);

    if (!cacheOption) {
      console.log('caching option not selected');
      const res = await request('/graphql', gql, variables);
      console.log('res', res);
      return res;
    } else {
      console.log('caching option selected!');

      const res = await fetch('/transversal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: gql,
          variables: variables,
        }),
      })
        .then((res) => res.json())
        .then((data) => data);
      return res;
    }
  }
}

export default TransversalClient;

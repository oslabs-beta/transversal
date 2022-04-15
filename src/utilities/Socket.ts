import { io, Socket } from 'socket.io-client';

class TransversalSocket {
	constructor(url: string) {
		this.socket: any = io(url)
	}
	/**
	 * Transversal Instance
	 * @param {*} timeout The timeout for socket connection
	 * @returns
	 */
	getTransversalInstance(timeout: number = 10000) {
		return new Promise((resolve, reject) => {
			// eslint-disable-next-line prefer-const
			let timer: any

			function responseHandler(data: any) {
				data = JSON.parse(data, (name, val) => {
					if (val && typeof val === 'string' &&	(val.startsWith('function') || val.startsWith('async'))) {
						return new Function('return ' + val)()
					} else {
						return val
					}
				})
				resolve(data)
				clearTimeout(timer)
			}

			this.socket.on('connect', () => console.log(this.socket.id))

			this.socket.once('transverse', responseHandler)

			timer = setTimeout((): void => {
				reject(new Error('Timeout waiting for response from the server'))
				socket.removeListener('transverse', responseHandler)
			}, timeout)
		});
	}
}

export default TransversalSocket

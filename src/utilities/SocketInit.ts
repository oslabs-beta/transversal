// Stringify object with methods
function replacer(key, value) {
	if (typeof value === 'function') {
		return value.toString();
	} else {
		return value;
	}
}

const json = JSON.stringify(
	{ gql: transversal.gql, transversalQuery: transversal.transversalQuery },
	replacer
);

/**
 * Socket IO - Bi-directional connection with client
 */

io.on('connection', (socket) => {
	console.log('client connected: ', socket.id);
	// Send gql object
	socket.emit('transverse', json);

	socket.on('disconnect', (reason) => {
		console.log(reason);
	});
});
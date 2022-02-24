require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const Transversal = require('../Transversal');
const { User, Message } = require('./models/mongoModel');
const PORT = process.env.PORT || 3000;
const socketio = require('socket.io');
const redis = require('redis');
const http = require('http');
const app = express();
const server = http.createServer(app);
const {
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLID,
	GraphQLSchema,
} = require('graphql');

const io = socketio(server, {
	cors: {
		origin: 'http://localhost:8080',
	},
});

/**
 * Middlewares
 */
// Handle cross origin
app.use(cors());

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Connect to Mongo DB
 */
const MONGO_URI =
	'mongodb+srv://transversal:1234@cluster0.dhzo8.mongodb.net/transversal?retryWrites=true&w=majority';

mongoose
	.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: 'transversal',
	})
	.then(() => console.log('Connected to Mongo DB.'))
	.catch((err) => console.log(err));


/**
 * Initialize Redis Client
 */

// const redisClient = redis.createClient({
// 	url: process.env.REDIS_URI || 'redis://default:pass@127.0.0.1:6379'
// });

/**
 * Instantiate Transversal and cache
 */

const transversal = new Transversal([User, Message]);

/**
 * Test code... run redis-server / redis-cli
 */
// async function test() {
// 	await transversal.cache.set('name', 'kim');
// 	const myName = await transversal.cache.get('name');
// 	console.log('hi', myName);
// 	return myName;
// }

// test();

/**
 * TODO: Build transversal api to handle cache option
 * Then, make a call to graphql
 */
app.use('/transversal', transversal.cache.cacheMiddleware);

// Generate field schema
transversal.generateFieldSchema();

// const customResolver = async (parent, args) => {
// 	const messages = await Message.find({ userId: parent._id });
// 	return messages;
// };
// transversal.generateRelationalField(
// 	'User',
// 	'messages',
// 	'Message',
// 	customResolver
// );

const custom = {
	name: 'String',
	age: 'Number',
	messages: [{ message: 'String' }],
};

transversal.generateCustomFieldSchema(custom, 'CustomQuery');

// Custom resolver and arguments
const resolver = async (parent, args) => {
	const users = await User.find({ age: args.age });
	return users;
};

const args = {
	age: { type: GraphQLInt },
	// height: { type: GraphQLInt },
};

// Generate resolver and query
transversal.generateQuery('getUsers', 'User', resolver, args);
transversal.generateQuery('getCustom', 'CustomQuery', resolver, args);

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

/**
 * GraphQL route
 */
app.use(
	'/graphql',
	graphqlHTTP({
		schema: transversal.RootSchema,
		graphiql: true,
	})
);

// Statically serve everything in the build folder on the route '/build'
if (process.env.NODE_ENV === 'production') {
	app.use('/build', express.static(path.join(__dirname, '../build')));

	// Serve index.html on the route '/'
	app.use('/', (req, res) => {
		return res.status(200).sendFile(path.join(__dirname, '../index.html'));
	});
}

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 500,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign({}, defaultErr, err);
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

/**
 * Start server
 */
server.listen(PORT, () => {
	console.log(`Server is running on the server ${PORT}`);
});

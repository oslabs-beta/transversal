require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT;

app.use('/', (req, res) => res.status(200).send('<h2>Transversal App</h2>'));

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}...`);
});
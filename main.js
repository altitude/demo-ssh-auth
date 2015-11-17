/**
* Create express app
*/
const express = require('express');
const app = express();

/**
* Middlewares
*/
const bodyParser = require('body-parser');
app.use(bodyParser.json());

/**
* Create io server
*/
const server = require('http').Server(app);
const io = require('./lib/socket')(server);

/**
* Serve static files
*/
app.use('/public', express.static(__dirname + '/public'));

/**
* Serve vue app
*/
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

/**
* Authenticate
*/
const pubsub = require('./lib/pubsub');
app.post('/session', (req, res) => {
	console.log(req.body);
	pubsub.pub(`SESSIONS:${req.body.session}`, JSON.stringify(req.body.keys));
	res.end('ok');
});

/**
* Listen
*/
server.listen(4022, () => {
	console.log('listening on :4022');
});
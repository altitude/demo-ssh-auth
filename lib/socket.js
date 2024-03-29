const crypto = require('crypto');

const pubsub = require('./pubsub');

module.exports = makeIO;

function makeIO(server) {

	const io = require('socket.io')(server);

	io.on('connection', (socket) => {

		var publicKey = '';

		const session = 
			crypto.randomBytes(Math.ceil(18 / 2))
			.toString('hex')
			.slice(0, 18);

		socket.emit('addr', {
			addr: `ssh ${process.env.LOGIN_HOST} -l ${session} -p ${process.env.LOGIN_PORT}`,
		});

		socket.on('publicKey', (data) => {
			publicKey = data.publicKey.split(' ')[1];
		});

		pubsub.sub(`SESSIONS:${session}`, (data) => {
			
			console.log('publicKey', publicKey);
			console.log('data', data);
			
			if (data.indexOf(publicKey) > -1) {
				socket.emit('authentication', {
					authenticated: true,
				});
			} else {
				socket.emit('authentication', {
					authenticated: false,
				});
			}
		});

		socket.on('disconnect', (socket) => {
			delete socket;
		});

	});

	return io;
}

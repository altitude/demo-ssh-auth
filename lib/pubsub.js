const redis = require('redis');

exports.pub = publish;
exports.sub = subscribe;

const publisher = redis.createClient();

function publish(channel, data) {
	publisher.publish(channel, data);
}

function subscribe(channel, callback) {
	
	const subscriber = redis.createClient();
	
	subscriber.on('message', (channel, message) => {
		callback(JSON.parse(message));
	});
	
	subscriber.subscribe(channel);
}
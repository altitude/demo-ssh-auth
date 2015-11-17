var socket = io.connect(window.location.origin);

var app = new Vue({

	el: '#app',

	data: {
		step: 0,
		publicKey: '',
		addr: '',
		error: false,
		authenticated: false,
	},

});

app.$watch('publicKey', function(newValue, oldValue) {
	socket.emit('publicKey', {publicKey: newValue});
});

socket.on('addr', function(data) {
	app.$data.$set('addr', data.addr);
});

socket.on('authentication', function(data) {
	if (data.authenticated) {
		app.$data.$set('authenticated', true);
		app.$data.$set('error', false);
	} else {
		app.$data.$set('error', true);
	}
});
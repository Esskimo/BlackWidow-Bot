module.exports = {
	name: 'ping',
	description: 'Pong! Yay! ^_^',
	execute(message) {
		message.channel.send('Pong');
	},
};

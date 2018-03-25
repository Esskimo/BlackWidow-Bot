module.exports = {
	name: 'server',
	description: 'Displays info about this server.',
	execute(message) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};

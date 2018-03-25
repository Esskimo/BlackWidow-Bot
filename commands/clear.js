module.exports = {
	name: 'clear',
	description: 'Clears up to 99 messages in a channel',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if(!amount) {
			return message.reply("you need to specify number of messages to be deleted (1-99).");
		}

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error while trying to clear messages in this channel!');
		});
	},
};

module.exports = {
	name: 'kick',
	description: 'Tag a member and kick them (but not really).',
	execute(message, args) {
		let member = message.mentions.members.first();
  	let reason = args.slice(1).join(" ");

		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		if(!reason) {
			return message.reply("you didn't specify a reason for the kick !");
		}

		message.channel.send('Member: ' + member + " Reason: " + reason);
		//member.kick(reason);
	},
};

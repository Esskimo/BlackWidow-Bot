module.exports = {
	name: 'kick',
	description: 'Tag a member, specify a reason and kick them',
	execute(message, args) {
		let member = message.mentions.members.first();
  	let reason = args.slice(1).join(" ");

		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		if(!reason) {
			return message.reply("you didn't specify a reason for the kick !");
		}

		member.kick(reason).then(() => message.channel.send(`Kicked ${member.displayName}. Reason = {` + reason + "}")).catch(err => {
			console.error(err);
			message.channel.send('there was an error when trying to kick [' + member + "]. Reason = {" + reason + "} ! ⚠️");
		});
	},
};

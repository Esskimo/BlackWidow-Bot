module.exports = {
	name: 'ban',
	description: 'Tag a member and ban them.',
	execute(message, args) {
		let member = message.mentions.members.first();
    let reason = args.slice(2).join(" ");

		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to ban them!');
		}

    if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}

    if(args[1] == null) {
      return message.channel.send("You didn't specify time!");
    }

    if(reason == null) {
      return message.channel.send("You didn't specify a reason!");
    }

    member.ban({ days: args[1], reason: reason }).then(() => message.channel.send(`Banned ${member.displayName} for <` + args[1] + "> days. Reason = {" + reason + "}")).catch(err => {
			console.error(err);
			message.channel.send('there was an error when trying to kick [' + member + "] for <" + args[1] + "> days . Reason = {" + reason + "} ! ⚠️");
		});
	},
};

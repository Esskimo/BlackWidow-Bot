const fs = require('fs');
const Discord = require("discord.js");
const logger = require('./node_modules/winston');
const { prefix, token } = require('./config.json');

const bot = new Discord.Client({
  autoReconnect: true
});
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});

bot.on('ready', () => {
  logger.info(`Logged in as ${bot.user.tag}!`);
  logger.info('Successfully connected !');
  bot.user.setActivity("BlackWidow.cz");
  //console.log(bot.channels);

  //var ch = bot.channels.get('426180839831764995');
  var ch = bot.channels.get('426532691119177738');
  ch.send("```❤️ Hello everyone! I'm awake once again! ❤️```");
});

bot.on('message', message => {
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(message.channel.type == "dm" || message.channel.type == "group") {
    message.author.send("```I'm really sorry, but I don't like talking in private like this.😖\n\nLet's chat normally in the BlackWidow channel instead!😍```").catch(function(err) {
      if(err != "DiscordAPIError: Cannot send messages to this user") console.log(err);
    });
    return;
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if(!message.member.roles.some(r=>["Owner", "Admin"].includes(r.name)) ) {
    logger.error("[" + message.author.tag + "] just tried to execute the <" + command + "> command. Args = {" + args + "} !");
    logger.error("But doesn't have administrator rights!");
    return;
  }

  if (!bot.commands.has(command)) return;

  if(command === 'shutdown') {
    message.channel.send("```😴 Goodbye everyone! I'm shutting down ! 😴```");
    bot.destroy()
    logger.info("[" + message.author.tag + '] just shut down the bot!');
    return;
  }

  if(command === 'reboot') {
    message.channel.send("```⚠️ Beware everyone! I'm rebooting ! ⚠️```").then(msg => bot.destroy()).then(() => bot.login(token));
    logger.info("[" + message.author.tag + '] just reloaded the entire bot!');
    logger.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    return;
  }

  try {
    bot.commands.get(command).execute(message, args);
    logger.warn("["+message.author.tag + "] just executed the <" + command + "> command. Args = {" + args + "} !");
  }
  catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command! ⚠️');
  }
});

bot.login(token);

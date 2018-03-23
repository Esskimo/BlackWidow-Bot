var Discord = require('./node_modules/discord.io');
var logger = require('./node_modules/winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (Bot ID: ' + bot.id + ')');
    bot.user.setStatus("dnd");
    bot.user.setGame("Nevíš si rady? /help");
});

bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '!') {
        var lwr = message.toLowerCase();
        var args = lwr.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            case 'help':
                bot.sendMessage({

                });
            break;
            // Just add any case commands if you want to..
         }
     }
});

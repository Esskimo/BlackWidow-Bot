const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "Displays this message with all commands",
	execute(message) {
    fs.readdir("./commands", (err, files) => {
        if(err) console.error(err);

        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if(jsfiles.length <= 0) {
            console.log("No commands to load!");
            return;
        }

        var namelist = "";
        var desclist = "";
        var help = [];

        let result = jsfiles.forEach((f, i) => {
          let props = require(`./${f}`);
          namelist = props.name;
          desclist = props.description;
          help.push("```Command: !" + namelist + " \n\tDescription: " + desclist + "```");
        });
        message.author.send(help);
      });
    },
};

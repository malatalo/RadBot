const Discord = require("discord.js");
const client = new Discord.Client();
const conf = require("./conf.json");

const soundboardPrivilege = conf.soundboardPrivilege;
const prefix = conf.prefix;

const commandSpam = new Set();

client.on('ready', () => {
    console.log("Logged in as " + client.user.tag + "!");
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (commandSpam.has(message.author.id)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //Block command spam from everyone except masterSenpai
    if (message.author.id !== conf.masterSenpai) {
        commandSpam.add(message.author.id);
        setTimeout(() => {
            commandSpam.delete(message.author.id);
        }, 2000);
    }
    /*
    if (message.member.roles.find("name", conf.soundboardPrivilege)) {

    }
*/
    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
    }

});

client.login(conf.token);

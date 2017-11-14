const Discord = require("discord.js");
const client = new Discord.Client();
const conf = require("./conf.json");

const soundboardPrivilege = conf.soundboardPrivilege;
const prefix = conf.prefix;

client.on('ready', () => {
    console.log("Logged in as "+client.user.tag+"!");
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if(message.member.roles.find("name", conf.soundboardPrivilege)){
    console.log("jukka");
  }
  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("pong!");
  } else if (message.content.startsWith(prefix + "foo")) {
    message.channel.send("bar!");
  }
});

client.login(conf.token);

const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('MjI5NjkzMTI0MjM3MDY2MjQw.DOkgtA.h8ukWmG6_Vt4jOEuUV3Zwe1H-xg');
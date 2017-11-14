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

const getBotClientToken = () => {
    const fs = require("fs");
    const confjson = fs.readFileSync("conf.json");
    const conf = JSON.parse(confjson);
    return conf.botClientToken;
}

client.login(getBotClientToken());
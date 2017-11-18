const Discord = require("discord.js");
const client = new Discord.Client();
const conf = require("./conf.json");
const fs = require("fs");

const soundboardPrivilege = conf.soundboardPrivilege;
const prefix = conf.prefix;
const masterSenpai = conf.masterSenpai;

const commandSpam = new Set();
let clientVoiceConnection = null;
let streamdispatcher = null;
let volume = 0.5;

client.on('ready', () => {
  console.log("Logged in as " + client.user.tag + "!");
});

const commands = {
  'reboot': (message, args) => {
    if (message.author.id == masterSenpai) {
      commands.leaveall(message,args);
      process.exit();
    }
  },
  'join': (message, args) => {
    if (message.author.id == masterSenpai) {
      return new Promise((resolve, reject) => {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel || voiceChannel.type !== 'voice') {
          return message.reply('Ei pysty, liian hapokasta');
        }
        voiceChannel.join().then(connection => {
          clientVoiceConnection = connection;
          return resolve(connection)
        }).catch(err => reject(err));
      });
    }
  },
  'leave': (message, args) => {
    if (message.author.id == masterSenpai) {
      const voiceChannel = message.member.voiceChannel;
      if (!voiceChannel || voiceChannel.type !== 'voice') {
        return message.reply('Ei pysty, liian hapokasta');
      }
      voiceChannel.leave();
      clientVoiceConnection = null;
    }
  },
  'leaveall': (message, args) => {
    if (message.author.id == masterSenpai) {
      Array.from(client.voiceConnections.values()).forEach(voiceConn => {
        if (!voiceConn.channel || voiceConn.channel.type !== 'voice') {
          return
        }
        voiceConn.channel.leave();
        clientVoiceConnection = null;
      });
    }
  },
  'play': (message, args) => {
    if (message.member.roles.find("name", conf.soundboardPrivilege) && clientVoiceConnection) {
      if (args[0] == "?") {
        let text = '';
        fs.readdirSync('./sounds/').forEach(file => text += file+",  ");
        message.channel.send(text);
      } else if (args[0] == "stop") {
        streamdispatcher.end();
      } else if (fs.readdirSync('./sounds/').indexOf(args[0] + ".mp3")>-1) {
        streamdispatcher=clientVoiceConnection.playFile("./sounds/"+args[0] + ".mp3",{volume:volume});
      }
    }
  },
  'stop': (message, args) => {
    if (message.member.roles.find("name", conf.soundboardPrivilege)) {
      streamdispatcher.end();
    }
  },
  'volume': (message, args) => {
    if (message.member.roles.find("name", conf.soundboardPrivilege)) {
      try {
          volume = parseFloat(args[0]);
          message.channel.send("volume on nyt "+volume).catch(console.error);
      } catch (err) {
          message.channel.send("anna desimaali").catch(console.error);
      }
    }
  },
  'ping': (message, args) => {
    message.channel.send("pong!").catch(console.error);
  },
  'joke': (message, args) => {
    require('./commands/joke.js').run(client, message, args);
  },
}

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }
  if (commandSpam.has(message.author.id)) {
    console.log("spam blocked");
    return;
  }
  //Block command spam from everyone except masterSenpai
  if (message.author.id !== masterSenpai) {
    commandSpam.add(message.author.id);
    setTimeout(() => {
      commandSpam.delete(message.author.id);
    }, 2500);
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (commands.hasOwnProperty(command)) {
    commands[command](message, args);
  }
});

client.login(conf.token);

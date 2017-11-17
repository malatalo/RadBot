const Discord = require("discord.js");
const client = new Discord.Client();
const conf = require("./conf.json");

const soundboardPrivilege = conf.soundboardPrivilege;
const prefix = conf.prefix;

const talkedRecently = new Set();

client.on('ready', () => {
    console.log("Logged in as " + client.user.tag + "!");
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (talkedRecently.has(message.author.id)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //Block command spam from everyone except masterSenpai
    if (message.author.id !== conf.masterSenpai) {
        talkedRecently.add(message.author.id);
        setTimeout(() => {
            talkedRecently.delete(message.author.id);
        }, 2000);
    }
    if (message.member.roles.find("name", conf.soundboardPrivilege)) {
        console.log("jukka");
    }

    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
    }

    if (command ===  'foo') {
        message.channel.send("bar!");
    } else if (command === 'joke') {
        message.channel.send('Mitkä renkaat laitetaan suklaa-autoon talvella?')
            .then(() => {
                message.channel.awaitMessages(response => response.content === 'no?', {
                        max: 1,
                        time: 30000,
                        errors: ['time'],
                    })
                    .then((collected) => {
                        message.channel.send('Kit-Kat :D::D');
                    })
                    .catch(() => {
                        message.channel.send('Pitää sanoa "no?" puolessa minuutissa :((');
                    });
            });
    } else if (command === 'asl') {
      let [age, sex, location] = args;
      message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
    }
});

client.login(conf.token);

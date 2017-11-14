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

    //Block command spam
    talkedRecently.add(message.author.id);
    setTimeout(() => {
        talkedRecently.delete(message.author.id);
    }, 2500);

    if (message.member.roles.find("name", conf.soundboardPrivilege)) {
        console.log("jukka");
    }
    
    if (message.content.startsWith(prefix + "ping")) {
        message.channel.send("pong!");
    } else if (message.content.startsWith(prefix + "foo")) {
        message.channel.send("bar!");
    } else if (message.content.startsWith(prefix + "joke")) {
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
    }
});

client.login(conf.token);

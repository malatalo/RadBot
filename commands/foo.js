exports.run = (client, message, args) => {
    message.channel.send("bar!").catch(console.error);
}

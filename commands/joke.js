exports.run = (client, message, args) => {
  message.channel.send('Mitkä renkaat laitetaan suklaa-autoon talvella?')
    .then(() => {
      message.channel.awaitMessages(response => response.content === 'no?', {
          max: 1,
          time: 30000,
          errors: ['time'],
        })
        .then((collected) => {
          message.channel.send('Kit-Kat :D::DD');
        })
        .catch(() => {
          message.channel.send('Kit-Kat :D::DD');
        });
    });
}

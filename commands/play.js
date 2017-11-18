exports.help = (client, message, args, fs) => {
  let files = fs.readdirSync('./sounds/');
  console.log(files);
}

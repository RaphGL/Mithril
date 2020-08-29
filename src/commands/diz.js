const { prefix } = require("../config.json");
module.exports = {
  name: "diz",
  description: "Manda uma mensagem através do bot",
  usage: `${prefix}diz <mensagem>`,
  commandType: "regular",
  hasArgs: true,
  guildOnly: false,
  execute(message, args) {
    args = args.join(" ");
    message.channel.send(args);
  },
};

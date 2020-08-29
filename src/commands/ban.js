const { prefix } = require("../config.json");

module.exports = {
  name: "ban",
  description: "Banir o usuário do servidor",
  usage: `${prefix}ban <usuário> ...`,
  hasArgs: true,
  commandType: "mod",
  guildOnly: true,
  execute(message) {
    if (message.member.hasPermission("BAN_MEMBERS")) {
      try {
        message.mentions.users.mapValues((value) => {
          message.guild.member(value).ban();
          message.channel.send(`${value.username} foi banido(a)`);
        });
      } catch {
        message.channel.send("Não tenho permissão para banir membros!");
      }
    }
  },
};

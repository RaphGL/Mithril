const { prefix } = require("../config.json");

module.exports = {
  name: "kick",
  description: "Expulsar o usuário do servidor",
  usage: `${prefix}kick <usuário> ...`,
  hasArgs: true,
  commandType: "mod",
  guildOnly: true,
  execute(message) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
      try {
        message.mentions.users.mapValues((value) => {
          message.guild.member(value).kick();
          message.channel.send(`${value.username} foi expulsado(a)`);
        });
      } catch {
        message.channel.send("Não tenho permissão para expulsar membros!");
      }
    }
  },
};

import { prefix } from "../config.json";
import Discord from "discord.js";

module.exports = {
  name: "kick",
  description: "Expulsar o usuário do servidor",
  usage: `${prefix}kick <usuário> ...`,
  hasArgs: true,
  commandType: "mod",
  guildOnly: true,
  execute(message: any, args: string[]) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
      try {
        let banUser: any = message.mentions.users.first();
        let banReason: string = args.slice(1).join(" ");
        message.guild.member(banUser).kick({reason: banReason});
        const embed = new Discord.MessageEmbed();
        if (args.length > 1) {
          embed
            .setColor("#bd93f9")
            .setTitle(`${banUser.tag} foi expulso`)
            .addField("Motivo:", `${banReason}`, true)
            .setThumbnail(banUser.displayAvatarURL());
        } else {
          embed
            .setColor("#bd93f9")
            .setDescription(`**${banUser.tag}** foi expulso`)
        }
        message.channel.send(embed);
      } catch {
        message.channel.send("Não tenho permissão para expulsar membros!");
      }
    }
  },
};

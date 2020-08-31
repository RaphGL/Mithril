import { prefix } from "../config.json";
import Discord from "discord.js";

module.exports = {
  name: "ban",
  description: "Banir o usuário do servidor",
  usage: `${prefix}ban <usuário> ...`,
  hasArgs: true,
  commandType: "mod",
  guildOnly: true,
  execute(message: any, args: string[]) {
    if (message.member.hasPermission("BAN_MEMBERS")) {
      try {
        let banUser: any = message.mentions.users.first();
        let banReason: string = args.slice(1).join(" ");
        message.guild.member(banUser).ban({reason: banReason});
        const embed = new Discord.MessageEmbed();
        if (args.length > 1) {
          embed
            .setColor("#bd93f9")
            .setTitle(`${banUser.tag} foi banido`)
            .addField("Motivo:", `${banReason}`, true)
            .setThumbnail(banUser.displayAvatarURL());
        } else {
          embed
            .setColor("#bd93f9")
            .setDescription(`**${banUser.tag}** foi banido`)
        }
        message.channel.send(embed);
      } catch {
        message.channel.send("Não tenho permissão para banir membros!");
      }
    }
  },
};

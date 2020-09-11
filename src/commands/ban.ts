import { prefix } from "../config.json";
import Discord from "discord.js";

module.exports = {
  name: "ban",
  description: "Ban a user from the server",
  usage: `${prefix}ban <user> <reason>`,
  hasArgs: true,
  commandType: "mod",
  guildOnly: true,
  execute(message: any, args: string[]) {
    if (message.member.hasPermission("BAN_MEMBERS")) {
      try {
        let banUser: any = message.mentions.users.first();
        let banReason: string = args.slice(1).join(" ");
        const embed = new Discord.MessageEmbed();
        if (message.author.id == banUser.id) {
          message.channel.send("You cannot ban yourself.");
          return;
        } else {
          message.guild.member(banUser).ban({ reason: banReason });
        }
        if (args.length > 1) {
          embed
            .setColor("#bd93f9")
            .setTitle(`${banUser.tag} was banned`)
            .addField("Motivo:", `${banReason}`, true)
            .setThumbnail(banUser.displayAvatarURL());
        } else {
          embed
            .setColor("#bd93f9")
            .setDescription(`**${banUser.tag}** was banned`);
        }
        message.channel.send(embed);
      } catch {
        message.channel.send("I do not have permissions to ban members!");
      }
    }
  },
};

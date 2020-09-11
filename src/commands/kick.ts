import { prefix } from "../config.json";
import Discord from "discord.js";

module.exports = {
  name: "kick",
  description: "Kick a user from the user",
  usage: `${prefix}kick <user> <reason>`,
  hasArgs: true,
  commandType: "mod",
  guildOnly: true,
  execute(message: any, args: string[]) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
      try {
        let kickUser: any = message.mentions.users.first();
        let kickReason: string = args.slice(1).join(" ");
        const embed = new Discord.MessageEmbed();
        if (message.author.id == kickUser.id) {
          message.channel.send("You cannot kick yourself.");
          return;
        } else {
          message.guild.member(kickUser).kick({ reason: kickReason });
        }
        if (args.length > 1) {
          embed
            .setColor("#bd93f9")
            .setTitle(`${kickUser.tag} was kicked`)
            .addField("Motivo:", `${kickReason}`, true)
            .setThumbnail(kickUser.displayAvatarURL());
        } else {
          embed
            .setColor("#bd93f9")
            .setDescription(`**${kickUser.tag}** was kicked`);
        }
        message.channel.send(embed);
      } catch {
        message.channel.send("I do not have permission to kick members!");
      }
    }
  },
};

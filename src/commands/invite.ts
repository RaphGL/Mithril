import { prefix } from "../config.json";
import { MessageEmbed } from "discord.js";

module.exports = {
  name: "invite",
  description: "Generates an invite link to add the bot to your server.",
  usage: `${prefix}invite`,
  hasArgs: false,
  commandType: "regular",
  guildOnly: false,
  execute(message: any, args: any, client: any) {
    client
      .generateInvite([
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADD_REACTIONS",
        "SEND_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MANAGE_EMOJIS",
        "MOVE_MEMBERS",
        "MENTION_EVERYONE",
      ])
      .then((link: string) => {
        let embed = new MessageEmbed()
          .setColor("#bd93f9")
          .setTitle("Use this link to invite the bot:")
          .setDescription(link);
        message.channel.send(embed);
      })
      .catch(console.error);
  },
};

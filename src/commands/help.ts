import Discord from "discord.js";
import { prefix } from "../config.json";
import fs from "fs";

function getCommands(message: any, args: string[]): void {
  const commands: string[] = fs.readdirSync(__dirname);
  if (!args.length) {
    let regularCommands: string[] = [];
    let moderationCommands: string[] = [];
    // checks command type and adds it to the appropriate array
    let cmd: any;
    for (let command of commands) {
      cmd = require(`${__dirname}/${command}`);
      if (cmd.commandType === "regular") {
        regularCommands.push(`\`${cmd.name}\``);
      } else if (cmd.commandType === "mod") {
        moderationCommands.push(`\`${cmd.name}\``);
      }
    }
    // create a help message with all available commands
    let commandsHelp = new Discord.MessageEmbed()
      .setColor("#bd93f9")
      .setTitle(module.exports.name.toUpperCase())
      .setAuthor("RaphGL")
      .addField("Regular Commands", regularCommands.join(" "))
      .addField("Moderation Commands", moderationCommands.join(" "));
    message.channel.send(commandsHelp);
  } else {
    // loops through commands until it finds the correct one to execute when it does it executes it and stops
    for (let _ of commands) {
      let cmd: any = require(`${__dirname}/${args[0]}`);
      if (args[0] === cmd.name) {
        // create help message for a specific commands
        let commandHelp = new Discord.MessageEmbed()
          .setColor("#bd93f9")
          .setTitle(cmd.name.toUpperCase())
          .setDescription(cmd.description)
          .addField("How to use", `\`${cmd.usage}\``);
        message.channel.send(commandHelp);
        break;
      }
    }
  }
}

module.exports = {
  name: "ajuda",
  description: "Mostra quais os comandos disponíveis e como usá-los.",
  usage: `${prefix}ajuda <comando?>`,
  commandType: "regular",
  guildOnly: false,
  execute(message: any, args: string[]) {
    getCommands(message, args);
  },
};

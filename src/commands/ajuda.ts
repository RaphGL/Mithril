import { prefix } from "../config.json";
import fs from "fs";

function getCommands(message:any, args:string[]) {
  const commands:string[] = fs.readdirSync(__dirname);
  if (!args.length) {
    let regularCommands:string[] = [];
    let moderationCommands:string[] = [];
    // checks command type and adds it to the appropriate array
    let cmd:any;
    for (let command of commands) {
      cmd = require(`${__dirname}/${command}`);
      if (cmd.commandType === "regular") {
        regularCommands.push(`\`${cmd.usage}\` ${cmd.description}`);
      } else if (cmd.commandType === "mod") {
        moderationCommands.push(`\`${cmd.usage}\` ${cmd.description}`);
      }
    }
    message.channel.send({
      embed: {
        color: 0xbd93f9,
        title: module.exports.name.toUpperCase(),
        author: {
          author: "RaphGL",
          icon_url:
            "https://avatars0.githubusercontent.com/u/28673457?s=460&u=1ebc812696254e1b08f97498393b409fc930362e&v=4",
        },
        fields: [
          {
            name: "Comandos normais",
            value: regularCommands,
          },
          {
            name: "Comandos de moderação",
            value: moderationCommands,
          },
        ],
      },
    });
  } else {
    for (let command of commands) {
      for (let arg of args) {
        let cmd = require(`${__dirname}/${command}`);
        if (arg === cmd.name) {
          message.channel.send({
            embed: {
              color: 0xbd93f9,
              title: cmd.name.toUpperCase(),
              description: cmd.description,
              fields: [
                {
                  name: "Como usar",
                  value: `\`${cmd.usage}\``,
                },
              ],
            },
          });
        }
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
  execute(message:any, args:string[]) {
    getCommands(message, args);
  },
};

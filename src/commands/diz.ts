import { prefix } from "../config.json";

module.exports = {
  name: "diz",
  description: "Manda uma mensagem através do bot",
  usage: `${prefix}diz <mensagem>`,
  commandType: "regular",
  hasArgs: true,
  guildOnly: false,
  execute(message: any, args: string[]) {
    const arg: string = args.join(" ");
    message.channel.send(arg);
  },
};

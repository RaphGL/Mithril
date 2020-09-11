import { prefix } from "../config.json";

module.exports = {
  name: "say",
  description: "Make the bot say something",
  usage: `${prefix}say <message>`,
  commandType: "regular",
  hasArgs: true,
  guildOnly: false,
  execute(message: any, args: string[]) {
    const arg: string = args.join(" ");
    message.delete();
    message.channel.send(arg);
  },
};

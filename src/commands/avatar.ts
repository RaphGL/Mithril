import { prefix } from '../config.json';

module.exports = {
  name: "avatar",
  description: "Mostra o avatar do usuário, se um usuário não é mencionado o autor da mensagem é usado como argumento",
  usage: `${prefix}avatar <usuário?>`,
  commandType: "regular",
  guildOnly: false,
  execute(message: any, args: string[]) {
    let embedbox = {
      embed: {
        color: 0xbd93f9,
        title: message.author.tag,
        image: {
          url: message.author.displayAvatarURL({
            size: 4096,
            dynamic: true,
          }),
        },
      },
    };
    if (!args.length) {
      message.channel.send(embedbox);
    } else {
      embedbox.embed.title = message.mentions.users.first().tag;
      embedbox.embed.image.url = message.mentions.users
        .first()
        .displayAvatarURL({ size: 4096, dynamic: true });
      message.channel.send(embedbox);
    }
  },
};


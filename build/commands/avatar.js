"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_json_1 = require("../config.json");
module.exports = {
    name: "avatar",
    description: "Sends the user's profile picture",
    usage: config_json_1.prefix + "avatar <user?>",
    commandType: "regular",
    guildOnly: false,
    execute: function (message, args) {
        var embedbox = {
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
        }
        else {
            embedbox.embed.title = message.mentions.users.first().tag;
            embedbox.embed.image.url = message.mentions.users
                .first()
                .displayAvatarURL({ size: 4096, dynamic: true });
            message.channel.send(embedbox);
        }
    },
};

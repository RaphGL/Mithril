"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_json_1 = require("../config.json");
var discord_js_1 = require("discord.js");
module.exports = {
    name: "convite",
    description: "Gera um convite para poder adicionar o bot a um servidor",
    usage: config_json_1.prefix + "convite",
    hasArgs: false,
    commandType: "regular",
    guildOnly: false,
    execute: function (message, args, client) {
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
            .then(function (link) {
            var embed = new discord_js_1.MessageEmbed()
                .setColor("#bd93f9")
                .setTitle("Use este link para convidar o bot:")
                .setDescription(link);
            message.channel.send(embed);
        })
            .catch(console.error);
    },
};

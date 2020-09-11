"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_json_1 = require("../config.json");
var discord_js_1 = __importDefault(require("discord.js"));
module.exports = {
    name: "ban",
    description: "Ban a user from the server",
    usage: config_json_1.prefix + "ban <user> <reason>",
    hasArgs: true,
    commandType: "mod",
    guildOnly: true,
    execute: function (message, args) {
        if (message.member.hasPermission("BAN_MEMBERS")) {
            try {
                var banUser = message.mentions.users.first();
                var banReason = args.slice(1).join(" ");
                var embed = new discord_js_1.default.MessageEmbed();
                if (message.author.id == banUser.id) {
                    message.channel.send("You cannot ban yourself.");
                    return;
                }
                else {
                    message.guild.member(banUser).ban({ reason: banReason });
                }
                if (args.length > 1) {
                    embed
                        .setColor("#bd93f9")
                        .setTitle(banUser.tag + " was banned")
                        .addField("Motivo:", "" + banReason, true)
                        .setThumbnail(banUser.displayAvatarURL());
                }
                else {
                    embed
                        .setColor("#bd93f9")
                        .setDescription("**" + banUser.tag + "** was banned");
                }
                message.channel.send(embed);
            }
            catch (_a) {
                message.channel.send("I do not have permissions to ban members!");
            }
        }
    },
};

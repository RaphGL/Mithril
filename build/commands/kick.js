"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_json_1 = require("../config.json");
var discord_js_1 = __importDefault(require("discord.js"));
module.exports = {
    name: "kick",
    description: "Kick a user from the user",
    usage: config_json_1.prefix + "kick <user> <reason>",
    hasArgs: true,
    commandType: "mod",
    guildOnly: true,
    execute: function (message, args) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
            try {
                var kickUser = message.mentions.users.first();
                var kickReason = args.slice(1).join(" ");
                var embed = new discord_js_1.default.MessageEmbed();
                if (message.author.id == kickUser.id) {
                    message.channel.send("You cannot kick yourself.");
                    return;
                }
                else {
                    message.guild.member(kickUser).kick({ reason: kickReason });
                }
                if (args.length > 1) {
                    embed
                        .setColor("#bd93f9")
                        .setTitle(kickUser.tag + " was kicked")
                        .addField("Motivo:", "" + kickReason, true)
                        .setThumbnail(kickUser.displayAvatarURL());
                }
                else {
                    embed
                        .setColor("#bd93f9")
                        .setDescription("**" + kickUser.tag + "** was kicked");
                }
                message.channel.send(embed);
            }
            catch (_a) {
                message.channel.send("I do not have permission to kick members!");
            }
        }
    },
};

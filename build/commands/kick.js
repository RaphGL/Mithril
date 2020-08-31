"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_json_1 = require("../config.json");
var discord_js_1 = __importDefault(require("discord.js"));
module.exports = {
    name: "kick",
    description: "Expulsar o usuário do servidor",
    usage: config_json_1.prefix + "kick <usu\u00E1rio> ...",
    hasArgs: true,
    commandType: "mod",
    guildOnly: true,
    execute: function (message, args) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
            try {
                var banUser = message.mentions.users.first();
                var banReason = args.slice(1).join(" ");
                message.guild.member(banUser).kick({ reason: banReason });
                var embed = new discord_js_1.default.MessageEmbed();
                if (args.length > 1) {
                    embed
                        .setColor("#bd93f9")
                        .setTitle(banUser.tag + " foi expulso")
                        .addField("Motivo:", "" + banReason, true)
                        .setThumbnail(banUser.displayAvatarURL());
                }
                else {
                    embed
                        .setColor("#bd93f9")
                        .setDescription("**" + banUser.tag + "** foi expulso");
                }
                message.channel.send(embed);
            }
            catch (_a) {
                message.channel.send("Não tenho permissão para expulsar membros!");
            }
        }
    },
};

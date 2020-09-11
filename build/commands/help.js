"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var config_json_1 = require("../config.json");
var fs_1 = __importDefault(require("fs"));
function getCommands(message, args) {
    var commands = fs_1.default.readdirSync(__dirname);
    if (!args.length) {
        var regularCommands = [];
        var moderationCommands = [];
        // checks command type and adds it to the appropriate array
        var cmd = void 0;
        for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
            var command = commands_1[_i];
            cmd = require(__dirname + "/" + command);
            if (cmd.commandType === "regular") {
                regularCommands.push("`" + cmd.name + "`");
            }
            else if (cmd.commandType === "mod") {
                moderationCommands.push("`" + cmd.name + "`");
            }
        }
        // create a help message with all available commands
        var commandsHelp = new discord_js_1.default.MessageEmbed()
            .setColor("#bd93f9")
            .setTitle(module.exports.name.toUpperCase())
            .setAuthor("RaphGL")
            .addField("Regular Commands", regularCommands.join(" "))
            .addField("Moderation Commands", moderationCommands.join(" "));
        message.channel.send(commandsHelp);
    }
    else {
        // loops through commands until it finds the correct one to execute when it does it executes it and stops
        for (var _a = 0, commands_2 = commands; _a < commands_2.length; _a++) {
            var _ = commands_2[_a];
            var cmd = require(__dirname + "/" + args[0]);
            if (args[0] === cmd.name) {
                // create help message for a specific commands
                var commandHelp = new discord_js_1.default.MessageEmbed()
                    .setColor("#bd93f9")
                    .setTitle(cmd.name.toUpperCase())
                    .setDescription(cmd.description)
                    .addField("How to use", "`" + cmd.usage + "`");
                message.channel.send(commandHelp);
                break;
            }
        }
    }
}
module.exports = {
    name: "ajuda",
    description: "Mostra quais os comandos disponíveis e como usá-los.",
    usage: config_json_1.prefix + "ajuda <comando?>",
    commandType: "regular",
    guildOnly: false,
    execute: function (message, args) {
        getCommands(message, args);
    },
};

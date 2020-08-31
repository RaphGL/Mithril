"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
                regularCommands.push("`" + cmd.usage + "` " + cmd.description);
            }
            else if (cmd.commandType === "mod") {
                moderationCommands.push("`" + cmd.usage + "` " + cmd.description);
            }
        }
        message.channel.send({
            embed: {
                color: 0xbd93f9,
                title: module.exports.name.toUpperCase(),
                author: {
                    author: "RaphGL",
                    icon_url: "https://avatars0.githubusercontent.com/u/28673457?s=460&u=1ebc812696254e1b08f97498393b409fc930362e&v=4",
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
    }
    else {
        for (var _a = 0, commands_2 = commands; _a < commands_2.length; _a++) {
            var command = commands_2[_a];
            for (var _b = 0, args_1 = args; _b < args_1.length; _b++) {
                var arg = args_1[_b];
                var cmd = require(__dirname + "/" + command);
                if (arg === cmd.name) {
                    message.channel.send({
                        embed: {
                            color: 0xbd93f9,
                            title: cmd.name.toUpperCase(),
                            description: cmd.description,
                            fields: [
                                {
                                    name: "Como usar",
                                    value: "`" + cmd.usage + "`",
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
    usage: config_json_1.prefix + "ajuda <comando?>",
    commandType: "regular",
    guildOnly: false,
    execute: function (message, args) {
        getCommands(message, args);
    },
};

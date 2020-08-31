"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_json_1 = require("../config.json");
module.exports = {
    name: "diz",
    description: "Manda uma mensagem através do bot",
    usage: config_json_1.prefix + "diz <mensagem>",
    commandType: "regular",
    hasArgs: true,
    guildOnly: false,
    execute: function (message, args) {
        var arg = args.join(" ");
        message.channel.send(arg);
    },
};

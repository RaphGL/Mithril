"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_json_1 = require("../config.json");
module.exports = {
    name: "say",
    description: "Make the bot say something",
    usage: config_json_1.prefix + "say <message>",
    commandType: "regular",
    hasArgs: true,
    guildOnly: false,
    execute: function (message, args) {
        var arg = args.join(" ");
        message.delete();
        message.channel.send(arg);
    },
};

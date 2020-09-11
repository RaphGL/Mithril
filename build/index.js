"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var config_json_1 = __importDefault(require("./config.json"));
var fs_1 = __importDefault(require("fs"));
var client = new discord_js_1.default.Client();
var commandFiles = fs_1.default.readdirSync(__dirname + "/commands");
// creates a collection of commands from files in commands dir
var commands = new discord_js_1.default.Collection();
for (var _i = 0, commandFiles_1 = commandFiles; _i < commandFiles_1.length; _i++) {
    var file = commandFiles_1[_i];
    var command = require(__dirname + "/commands/" + file);
    commands.set(command.name, command);
}
client.once("ready", function () {
    console.log("Ready!");
});
// Interpret and take action on received message
client.on("message", function (message) {
    var _a;
    if (!message.content.startsWith(config_json_1.default.prefix) || message.author.bot) {
        return;
    }
    // Parses user messages
    var args = message.content.slice(config_json_1.default.prefix.length).trim().split(/ +/);
    var command = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    try {
        var cmd = commands.get(command);
        // Ignores command and alerts the user that action can't be performed outside of servers
        if (cmd.guildOnly && message.channel.type == "dm") {
            message.channel.send("You have to be in a server to use this command.");
            return;
        }
        // Executes command's function
        if (args.length === 0 && cmd.hasArgs == true) {
            message.channel.send("No arguments were given, to use this command do: `" +
                cmd.usage +
                "`");
            return;
        }
        else {
            cmd.execute(message, args, client);
            return;
        }
    }
    catch (error) {
        // Alerts the user that the command is invalid
        console.error(error);
        message.channel.send("Invalid command.");
    }
    return;
});
client.login(config_json_1.default.token);

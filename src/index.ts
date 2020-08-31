import Discord from 'discord.js';
import config from './config.json';
import fs from 'fs';

const client = new Discord.Client();

const commandFiles:string[] = fs.readdirSync(`${__dirname}/commands`);
// creates a collection of commands from files in commands dir
const commands = new Discord.Collection();
for (let file of commandFiles) {
  const command:any = require(`${__dirname}/commands/${file}`);
  commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
});

// Interpret and take action on received message
client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) {
    return;
  }

  // Parses user messages
  const args:string[] = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();
  try {
    const cmd:any = commands.get(command);
    // Ignores command and alerts the user that action can't be performed outside of servers
    if (cmd.guildOnly && message.channel.type == "dm") {
      message.channel.send(
        "Este comando não pode ser usado fora de servidores"
      );
      return;
    }
    // Executes command's function
    if (args.length === 0 && cmd.hasArgs == true) {
      message.channel.send(
        "Nenhum argumento foi dado, para usar este comando use: `" +
          cmd.usage +
          "`"
      );
      return;
    } else {
      cmd.execute(message, args);
      return;
    }
  } catch (error) {
    // Alerts the user that the command is invalid
    console.error(error);
    message.channel.send("O comando que digitou é inválido.");
  }
  return;
});

client.login(config.token);

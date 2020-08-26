const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

const client = new Discord.Client();

const commandFiles = fs.readdirSync(`${__dirname}/commands`);
const commands = new Discord.Collection();
for (let file of commandFiles) {
        const command = require(`${__dirname}/commands/${file}`);
        commands.set(command.name, command);
}

client.once('ready', () =>{
        console.log('Ready!');
});

// Interpret and take action on received message
client.on('message', message => {
        if (!message.content.startsWith(config.prefix) || message.author.bot){
                return;
        }

        // Parses user messages
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        try {
                cmd = commands.get(command);
                // Ignores command and alerts the user that action can't be performed outside of servers
                if (cmd.guildOnly && message.channel.type == 'dm'){
                        message.channel.send('Este comando não pode ser usado fora de servidores');
                        return;
                }
                // Executes command's function
                if (args.length === 0 && cmd.hasArgs == true){
                        message.channel.send("Nenhum argumento foi dado, para usar este comando use: `" + cmd.usage + '`');
                        return;
                } else {
                        cmd.execute(message, args);
                        return;
                }
        }
        // Alerts the user that the command is invalid
        catch (error){
                console.error(error);
                message.channel.send('O comando que digitou é inválido.');
        }
        return;
});

client.login(config.token);

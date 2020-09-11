# Mithril
### Mithril is a self-hosted discord bot

The bot aims to provide an easy to setup, self-hosted bot. Adding new commands is as simple as making a new command.ts file in the commands directory.

## Mithril exports api  
The exports api gives some functionality to the bot, the bot knows of the existence of commands as soon as they're added to the commands folder. The exports variables and execute function are necessary so that the bot knows what to run when commands are called and to provide other quality of life improvements such as dynamic help messages, message location checking and user's permissions.

```javascript
modules.exports = {
        name: "name of command", // is used to generate help page and to identify command when typed by user
        description: "description of command", // used in generated help page
        usage: `${prefix}name_of_command <how_to_use>`, // used in generated help page
        commandType: 'regular/mod', // required, regular allows everyone to run them, mod requires being a moderator
        guildOnly: boolean, // checks if command can only be ran inside of guild
        // gives the event's message and an array with the arguments passed to the command
        execute(message, args){
                your_functionalities;
        }
}```

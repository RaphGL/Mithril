const {prefix} = require('../config.json');

const quotes = {
        leandro: "leite dos açores",
        talhante: "Cagar é divertido, limpar o cu é que é  fodido",
        catuna: "MILOS NATION !!!!",
}

module.exports = {
        name: 'citar',
        description: 'Cite a frase de um usuário do servidor',
        usage: `${prefix}citar <usuário>`,
        commandType: 'regular',
        hasArgs: true,
        guildOnly: true,
        execute(message, args) {
                const keys = Object.keys(quotes);
                keys.forEach(key => {
                        for (let arg of args){
                                if (key == arg){
                                        message.channel.send(quotes[key]);
                                }
                        }
                });
        }
}

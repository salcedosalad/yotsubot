const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-y ';

const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

//feedback message for terminal, also set status/activity 
client.once('ready', () => {
    console.log('Yotsubot is online!');
    client.user.setStatus('online');
    client.user.setActivity(`${prefix}`, { type: 'LISTENING' });
});

client.on('message', message => {
    //if the message doesn't have a prefix or is sent by another bot, ignore it
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //remove the prefix from the message and store all the arguments in args
    //then, isolate the name of the command by grabbing the first element in args
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    //if statement for each command is found here
    //each command has an associated .js file that contains the behavior/methods of that command
    //commands are stored in the "commands" folder
    if (command === 'ping')
        client.commands.get('ping').execute(message, args);
    else if (command === 'argtest')
        client.commands.get('argtest').execute(message, args);
    else if (command === '+')
        client.commands.get('add').execute(message, args);
    else if (command === '-')
        client.commands.get('subtract').execute(message, args);
    else if (command === '*')
        client.commands.get('multiply').execute(message, args);
    else if (command === '/')
        client.commands.get('divide').execute(message, args);
    else   
        message.channel.send(`Command not found, ${message.author}!`);
});

//make sure this is executed last
client.login('Nzk3NTgyODQ4MDUwNzI0OTE1.X_ok6Q.U3aHYy2dkQ34V0kw5f-Xg4Vqr5E');
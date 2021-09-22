const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = 'y:';
const { token } = require('./config.json');

const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

var music = { song: "", audiostream: "", playing: 0, title: "" };
let queueMessage = new Array();
let queueArgs = new Array();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

//feedback message for terminal, also set status/activity 
client.once('ready', () => {
    console.log('Yotsubot is online!');
    client.user.setStatus('online');
    client.user.setActivity(`${prefix}help | (Mat's Discord Bot)`, { type: 'PLAYING' });
});
client.once('reconnecting', () => {
    console.log('Yotsubot is reconnecting!');
});
client.once('disconnect', () => {
    console.log('Yotsubot is disconnecting!');
});

client.on('message', message => {
    //detects the end of a song the bot was playing and checks the queue for another song to play
    if (message.author === client.user && message.content.startsWith('Finished playing')) {
        console.log('Detected end of song!');
        if (queueMessage.length !== 0)
            client.commands.get('play').execute(queueMessage.shift(), queueArgs.shift(), Discord), music;
        else
            playing = 0;
    }

    //if the message doesn't have a prefix or is sent by another bot, ignore it
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //remove the prefix from the message and store all the arguments in args
    //then, isolate the name of the command by grabbing the first element in args
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    //commands local to salcedosalad's machine, these may be deleted
    if (command === 'aherosjourney')
        return client.commands.get('aherosjourney').execute(message, args);
    else if (command === 'whenyou')
        return client.commands.get('whenyou').execute(message, args);

    //if statement for each command is found here
    //each command has an associated .js file that contains the behavior/methods of that command
    //commands are stored in the "commands" folder

    //BASIC COMMANDS
    if (command === 'help') {
        if (args.length === 1) {
            if (client.commands.get(args[0]))
                message.channel.send(client.commands.get(args[0]).description);
        }
        else
            client.commands.get('help').execute(message, args, Discord);
    }
    else if (command === 'ping')
        client.commands.get('ping').execute(message, args);
    else if (command === 'argtest')
        client.commands.get('argtest').execute(message, args);
    else if (command === 'say')
        client.commands.get('say').execute(message, args);
    else if (command === 'about')
        client.commands.get('about').execute(message, args, Discord);

    //ARITHMETIC COMMANDS
    else if (command === '+')
        client.commands.get('add').execute(message, args);
    else if (command === '-')
        client.commands.get('subtract').execute(message, args);
    else if (command === '*')
        client.commands.get('multiply').execute(message, args);
    else if (command === '/')
        client.commands.get('divide').execute(message, args);

    //MUSIC COMMANDS
    else if (command === 'play' || command === 'p') {
        //if a song is currently playing, push the request into the queue
        if (music.playing) {
            queueMessage.push(message);
            queueArgs.push(args);
            client.commands.get('queueMessage').execute(message, args, Discord, queueMessage.length);
        }
        //if there is no song playing, just fulfill the request if there is one
        else if (args.length) {
            music.playing = 1;
            client.commands.get('play').execute(message, args, Discord, music);
        }
    }
    else if (command === 'leave' || command === 'stop') {
        client.commands.get('stop').execute(message, args, Discord);
        music.playing = 0;
        queueMessage.length = 0;
        queueArgs.length = 0;
    }
    else if (command === 'queue' || command === 'q') {
        client.commands.get('queue').execute(message, args, Discord, queueMessage, queueArgs);
    }
    else if (command === 'clearqueue' || command === 'cq') {
        queueMessage.length = 0;
        queueArgs.length = 0;
        client.commands.get('clearqueue').execute(message, args, Discord);
    }
    else if (command === 'skip' || command === 's') {
        client.commands.get('skip').execute(message, args, Discord);
        if (queueMessage.length !== 0)
            client.commands.get('play').execute(queueMessage.shift(), queueArgs.shift(), Discord);
        else
            music.playing = 0;
    }
    else if (command === 'pause') {
        client.commands.get('pause').execute(message, Discord, music);
    }
    else if (command === 'resume') {
        client.commands.get('resume').execute(message, Discord, music);
    }
    
    //EXTRA COMMANDS
    else if (command === 'sadcatto')
        client.commands.get('sadcatto').execute(message, args, Discord);

    //default case
    else   
        message.channel.send(`Command not found, ${message.author}!`);
});

//make sure this is executed last
//if on github, note any token here is no longer valid
client.login(token);
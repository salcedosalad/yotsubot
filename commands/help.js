module.exports = {
    name: 'help',
    description: "This provides a list of commands or help with a specific command. `Ex. y:help or y:help say`",
    execute(message, args, Discord) {
        var page = 0;
        const MAX = 3;
        const MIN = 0;

        var help = new Array();

        const filter = (reaction, user) => {
            return ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        help[0] = new Discord.MessageEmbed()
        .setColor('#ffb74a')
        .setTitle('Commands - Basic')
        .setDescription("Type `y:help [command]` for examples")
        .addFields(
            {name: 'help', value: 'Provides help with commands.'},
            {name: 'about', value: 'Introduces Yotsubot.'},
            {name: 'ping', value: 'Checks if the bot is responsive.'},
            {name: 'say', value: 'Repeats the input given.'},
            {name: 'argtest', value: 'Tests command/argument parsing.'}
        )
        .setThumbnail('https://i.imgur.com/cR5qQgW.jpg')
        .setFooter(`Page 1 of ${MAX+1}`);

        help[1] = new Discord.MessageEmbed()
        .setColor('#ffb74a')
        .setTitle('Commands - Music')
        .setDescription("Type `y:help [command]` for examples")
        .addFields(
            {name: 'play', value: 'Searches for and plays audio from a YouTube video.\nIf something\'s already playing, the request is queued.'},
            {name: 'leave', value: 'Stops playing music and leaves the voice channel.'},
            {name: 'queue', value: 'Shows the current music request queue.'},
            {name: 'clearqueue', value: 'Clears the music request queue.'},
            {name: 'skip', value: 'Skips the current song being played.'}
        )
        .setThumbnail('https://i.imgur.com/cR5qQgW.jpg')
        .setFooter(`Page 2 of ${MAX+1}`);

        help[2] = new Discord.MessageEmbed()
        .setColor('#ffb74a')
        .setTitle('Commands - Simple Arithmetic')
        .setDescription("Type `y:help [command]` for examples")
        .addFields(
            {name: '+', value: 'Sums all numbers provided.'},
            {name: '-', value: 'Subtracts all numbers provided (left to right).'},
            {name: '*', value: 'Multiplies all numbers provided.'},
            {name: '/', value: 'Divides all numbers provided (left to right).'}
        )
        .setThumbnail('https://i.imgur.com/cR5qQgW.jpg')
        .setFooter(`Page 3 of ${MAX+1}`);

        help[3] = new Discord.MessageEmbed()
        .setColor('#ffb74a')
        .setTitle('Commands - Extra')
        .setDescription("Type `y:help [command]` for examples")
        .addFields(
            {name: 'sadcatto', value: 'When your hunter carts again :('},
        )
        .setThumbnail('https://i.imgur.com/cR5qQgW.jpg')
        .setFooter(`Page 4 of ${MAX+1}`);

        message.channel.send(help[page]).then(msg => {
            msg.react('⬅️').then(() => msg.react('➡️'))

            const collector = msg.createReactionCollector(filter, { time: 60000 });

            collector.on('collect', (reaction, user) => {
                //console.log(`collected ${reaction.emoji.name} from ${user.tag}`);
                if (reaction.emoji.name === '➡️') {
                    if (page === MAX)
                        page = MIN;
                    else
                        page++;
                    msg.edit(help[page]);
                }  
                else if (reaction.emoji.name === '⬅️') {
                    if (page === MIN)
                        page = MAX;
                    else
                        page--;
                    msg.edit(help[page]);
                }
            })
        });
    }
}
module.exports = {
    name: 'skip',
    description: "This skips the current song being played. `Ex. y:skip or y:s`",
    async execute(message, args, Discord) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
            return message.channel.send(`You must be in a voice channel, ${message.author}!`);

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK'))
            return message.channel.send(`You don't have correct permissions, ${message.author}!`);

        const connection = await voiceChannel.join();

        if (!connection.dispatcher)
            return message.channel.send(`There is nothing currently playing, ${message.author}!`);

        connection.dispatcher.pause();

        const skipEmbed = new Discord.MessageEmbed()
        .setColor('#ffb74a')
        .setTitle(`Skipping current song!`);

        console.log('Skipping current song!');
        message.channel.send(skipEmbed);
    }
}
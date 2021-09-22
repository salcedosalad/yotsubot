module.exports = {
    name: 'skip',
    description: "This skips the current song being played. `Ex. y:skip or y:s`",
    async execute(message, args, Discord, music) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
            return message.channel.send(`You must be in a voice channel, ${message.author}!`);

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK'))
            return message.channel.send(`You don't have correct permissions, ${message.author}!`);

        if (!music.audiostream)
            return message.channel.send(`There is nothing currently playing, ${message.author}!`);

        music.audiostream.pause();

        const skipEmbed = new Discord.MessageEmbed()
        .setColor('#ffb74a')
        .setTitle(`Skipping current song!`);

        console.log('Skipping current song!');
        message.channel.send(skipEmbed);
    }
}
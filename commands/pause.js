const ytdl = require('ytdl-core');
const ytSearch = require('yt-search'); 

module.exports = {
    name: 'pause',
    description: "This pauses a currently playing song. Ex. `y:pause`",
    async execute(message, Discord, music) {
        let voiceChannel = message.member.voice.channel;

        if (!voiceChannel)
            return message.channel.send(`You must be in a voice channel, ${message.author}!`);
        if (!music.playing)
            return message.channel.send(`Nothing is currently playing, ${message.author}!`);

        music.audiostream.pause(true);

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#ffb74a')
        .setTitle(`Pausing ***\`${music.title}\`***`);

        message.channel.send(newEmbed);

        return;
    }
}
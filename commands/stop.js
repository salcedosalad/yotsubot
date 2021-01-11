module.exports = {
    name: 'stop',
    description: "Stops playing music and leaves a voice channel. `Ex. y:leave`",
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel)
            return message.channel.send(`You must be in a voice channel to stop the bot, ${message.author}!`);

        await voiceChannel.leave();
        await message.channel.send(`Leaving channel! :wave:`);
    }
}
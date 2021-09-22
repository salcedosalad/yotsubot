const ytdl = require('ytdl-core');
const ytSearch = require('yt-search'); 

module.exports = {
    name: 'play',
    description: "This searches and plays audio from YouTube. `Ex. y:play country roads or y:p country roads`",
    async execute(message, args, Discord, music) {
        const voiceChannel = message.member.voice.channel;
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#ffb74a')
        .setTitle(`:musical_note:   Now playing   :musical_note:`);
        
        if (!voiceChannel) {
            message.channel.send(`You must be in a voice channel, ${message.author}!`);
            return; 
        }
        if (!args.length) {
            message.channel.send(`No input provided, ${message.author}!`);
            return; 
        }

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            message.channel.send(`You don't have correct permissions, ${message.author}!`);
            return;
        }
        
        const checkUrl = (url) => {
            var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            return regexp.test(url);
        }

        if (checkUrl(args[0])) {
            const connection = await voiceChannel.join();
            music.song = ytdl(args[0], {filter: 'audioonly'});
            music.audiostream = connection.play(music, {seek: 0, volume: 0.5})
            .on('finish', () => {
                message.channel.send(`Finished playing ***\`${args[0]}\`***!`);
            });

            newEmbed.setDescription(`***\`${args[0]}\`***`)
            newEmbed.addFields(
                {name: `${args[0]}`, value: `Requested by ${message.author}`}
            );
            await message.channel.send(newEmbed);
        }
        else {
            const connection = await voiceChannel.join();
            const search = async (query) => {
                const result = await ytSearch(query);
                
                if (result.videos.length > 1)
                    return result.videos[0];
                else
                    return null;
            };

            const video = await search(args.join(' '));

            if (video) {
                music.song = ytdl(video.url, {filter: 'audioonly'});
                console.log('Playing a song!');
                newEmbed.setDescription(`***\`${video.title}\`***`)
                newEmbed.setImage(video.thumbnail);
                newEmbed.addFields(
                    {name: `${video.url}`, value: `Requested by ${message.author}`}
                );
                await message.channel.send(newEmbed);

                music.audiostream = connection.play(music.song, {seek: 0, volume: 0.5})
                .on('finish', () => {
                    message.channel.send(`Finished playing ***\`${video.title}\`***!`);
                });
            }
            else {
                message.channel.send(`No results found :slight_frown:`);
            }
        }
    }
}
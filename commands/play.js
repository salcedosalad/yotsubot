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

        const connection = await voiceChannel.join();
        const search = async (query) => {
            const result = await ytSearch(query);
            
            if (result.videos.length > 1)
                return result.videos[0];
            else
                return null;
        };

        var query = args.join(' ');
        
        if(checkUrl(args[0])) {
            var urlQuery = args[0].match(/.*\/(.+)/);
            if (!urlQuery[1] || !(args[0].includes("youtube") || args[0].includes("youtu.be"))) {
                message.channel.send(`Invalid YouTube URL, ${message.author}!`);
                return;
            }
            query = urlQuery[1];

            if (urlQuery[1].includes("watch?v="))
                query = query.replace("watch?v=", ""); 
        }

        const video = await search(query);

        if (video) {
            music.song = ytdl(video.url, {filter: 'audioonly'});
            music.title = video.title;

            console.log(`Playing a song: ${video.title}`);

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
            
            return;
        }
        else {
            message.channel.send(`No results found :slight_frown:`);
            return;
        }
    }
}
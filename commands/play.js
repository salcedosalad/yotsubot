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
        
        //verifies that a given test string is a url
        const checkUrl = (url) => {
            var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            return regexp.test(url);
        }
        
        //returns first video result of ytSearch using given query or video ID
        const search = async (query, idFlag) => {
            var result;
            if (idFlag) {
                result = await ytSearch( { videoId: query } );
                return result;
            }
            else {
                result = await ytSearch(query);
                
                if (result.videos.length > 1)
                    return result.videos[0];
                else
                    return null;
            }
        };

        const connection = await voiceChannel.join();
        var query = args.join(' ');
        var video;
        
        if(checkUrl(args[0])) {
            //only retrieve the last part of the url
            var urlQuery = args[0].match(/.*\/(.+)/);

            //if there is no final part of the URL or if the URL is not a youtube link, it's invalid
            if (!urlQuery[1] || !(args[0].includes("youtube") || args[0].includes("youtu.be"))) {
                message.channel.send(`Invalid YouTube URL, ${message.author}!`);
                return;
            }

            query = urlQuery[1];
            
            //remove part before video code if it exists
            if (urlQuery[1].includes("watch?v="))
                query = query.replace("watch?v=", ""); 

            //search using the id
            video = await search(query, 1);
        }
        else
            //search for the video using search args
            video = await search(query, 0);

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
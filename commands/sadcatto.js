module.exports = {
    name: 'sadcatto',
    description: "Sad kitty :( `Ex. y:sadcat`",
    execute(message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#ffb74a')
        .setTitle('Sad Cat')
        .setImage('https://i.kym-cdn.com/photos/images/original/001/384/767/b1c.jpg')
        .setFooter('why he sad? :(');

        message.channel.send(newEmbed);
    }
}
module.exports = {
    name: 'about',
    description: "Outputs some info about Yotsubot. `Ex. y:about`",
    execute(message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#ffb74a')
        .setTitle('About Yotsubot')
        .setThumbnail('https://i.imgur.com/cR5qQgW.jpg')
        .setURL('https://github.com/salcedosalad/yotsubot')
        .addField('Hello!', `This is a lightweight Discord bot developed mainly for practice and/or fun. Features and commands will be continually added as I see fit.`)
        .setFooter('Check out the github (linked in title) for more!');

        message.channel.send(newEmbed);
    }
}
module.exports = {
    name: 'queueMessage',
    description: "This runs instead of the play command when a song is already playing.",
    execute(message, args, Discord, pos) {
        const queueEmbed = new Discord.MessageEmbed()
        .setColor('#ffb74a')
        .setTitle(`Queued request for \`"${args.join(' ')}"\` by ${message.author.tag}!`)
        .setFooter(`Currently #${pos} in queue`);

        console.log('Queued a song!');
        message.channel.send(queueEmbed);
    }
}
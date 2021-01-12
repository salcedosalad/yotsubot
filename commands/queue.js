module.exports = {
    name: 'queue',
    description: "This shows the current music queue. `Ex. y:queue or y:q`",
    execute(message, args, Discord, queueMessage, queueArgs) {
        const queueEmbed = new Discord.MessageEmbed()
        .setColor('#ffb74a')
        .setTitle('Current Requests');

        if (queueMessage.length === 0) {
            queueEmbed.setTitle('There are no requests currently queued.');
        }
        else {
             let i = 0;
             for (i = 0; i < queueMessage.length; i++) {
                 queueEmbed.addField(`${i+1}. \`"${queueArgs[i].join(' ')}"\``, `Requested by ${queueMessage[i].author.tag}`, false);
             }
             queueEmbed.setThumbnail('https://i.imgur.com/cR5qQgW.jpg');
        }

        message.channel.send(queueEmbed);
    }
}
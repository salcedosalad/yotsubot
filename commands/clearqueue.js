module.exports = {
    name: 'clearqueue',
    description: "This clears the queue of music requests. `Ex. y:clearqueue or y:cq`",
    execute(message, args, Discord) {
        const clearEmbed = new Discord.MessageEmbed()
        .setColor('#ffb74a')
        .setTitle(`The queue has been cleared! :+1:`)

        console.log('Clearing queue!');
        message.channel.send(clearEmbed);
    }
}
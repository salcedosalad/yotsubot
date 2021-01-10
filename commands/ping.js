let x = 0;

module.exports = {
    name: 'ping',
    description: "This tests if the bot is responding. `Ex. y:ping`",
    execute(message, args) {
        if (x > 3) {
            message.channel.send('stop bothering me');
            x = 0;
        }
        else {
            message.channel.send('dont worry im here');
            x++;
        }
    }
}
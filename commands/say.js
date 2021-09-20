module.exports = {
    name: 'say',
    description: "This makes the bot repeat the text given. `Ex. y:say hello world`",
    execute(message, args) {
        if (!args.length)
            return message.channel.send(`No input was provided, ${message.author}!`);

        let msg = args[0];
        let i = 0;
        for (i = 1; i < args.length; i++) {
            msg += ' ';
            msg += args[i];
        }
        message.channel.send(msg);
    }
}
module.exports = {
    name: 'argtest',
    description: "argument testing",
    execute(message, args) {
        if (args.length === 0) 
            return message.channel.send(`No arguments provided, ${message.author}!`);

        message.channel.send(`Command name: argtest\nArguments: ${args}`);
    }
}
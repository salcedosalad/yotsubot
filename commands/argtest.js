module.exports = {
    name: 'argtest',
    description: "This is purely for command testing. `Ex. y:argtest hello world`",
    execute(message, args) {
        if (args.length === 0) 
            return message.channel.send(`No arguments provided, ${message.author}!`);

        message.channel.send(`Command name: argtest\nArguments: ${args}`);
    }
}
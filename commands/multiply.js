module.exports = {
    name: 'multiply',
    description: "this is a basic multiplication command",
    execute(message, args) {
        if (!args.length)
            return message.channel.send(`No numbers provided.`);

        var numbers = args.map(Number);
        var result = numbers.reduce((a,b) => a * b, 1);

        if (result !== result)
            message.channel.send(`All arguments must be numbers, ${message.author}!`);
        else
            message.channel.send(result);
    }
}
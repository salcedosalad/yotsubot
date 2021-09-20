module.exports = {
    name: 'multiply',
    description: "This multiplies all numbers provided. `Ex. y:* 10 9 100`",
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
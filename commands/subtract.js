module.exports = {
    name: 'subtract',
    description: "This subtracts all numbers given from left to right. `Ex. y:- 10 9 8 7`",
    execute(message, args) {
        if (!args.length)
            return message.channel.send(`No numbers provided.`);

        var numbers = args.map(Number);
        var result = numbers.reduce((a,b) => a - b, args[0]*2);

        if (result !== result)
            message.channel.send(`All arguments must be numbers, ${message.author}!`);
        else
            message.channel.send(result);
    }
}
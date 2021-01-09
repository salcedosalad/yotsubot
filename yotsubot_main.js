const Discord = require('discord.js');
const client = new Discord.Client();

//feedback message for terminal
client.once('ready', () => {
    console.log('Yotsubot is online!');
});

//make sure this is executed last
client.login('Nzk3NTgyODQ4MDUwNzI0OTE1.X_ok6Q.U3aHYy2dkQ34V0kw5f-Xg4Vqr5E');
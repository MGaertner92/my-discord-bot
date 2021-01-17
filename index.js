const Discord = require("discord.js");
//const config = require("./config.json");
const dicing = require("./dicing.js");
const fetch = require('node-fetch');

const client = new Discord.Client();
const TOKEN = process.argv[2];
client.login(TOKEN);

const prefix = "!";

client.on("message", function(message){
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "ping"){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }

    if (command === "roll"){
        if (args.length == 0){
            diceResult = dicing.roll(1, 6);
            message.reply(`Rolling a d6 resulted in ${diceResult.rollResults.sum}.`);;
        };

        if (args.length == 1){
            const rollType = args[0].split('d');
            if (rollType.length != 2){
                message.reply('Invalid roll format, please use xdy format for x dice with y sides.');
            } else {
                let diceResult = dicing.roll(rollType[0], rollType[1]);
                let sum = diceResult.rollResults.sum;
                let results = diceResult.rollResults.individualResults;
                message.reply(`Rolling ${args[0]} resulted in ${sum}. Individual results were ${results}`);
            }
        }
    
    }

    if (command === "apex"){
        fetch('https://fn.alphaleagues.com/v1/apex/map/')
            .then(response => response.json())
            .then(data => {
                message.reply(`Current Map is ${data.map}. There are ${Math.round(data.times.remaining.minutes)} minutes until it changes.`);
            });   
    }
});


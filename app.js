require('dotenv').config();

const Discord = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

if (!process.env.DISCORD_BOT_API_KEY) {
    console.log('Add your telegram bot api key to .env file');
    return;
}

const client = new Discord.Client();
const app = express();
const PREFIX = '!';

// set middleware parses
app.use(jsonParser);
app.use(urlencodedParser);

routes(app, client);

// discord side
client.on('ready', () => {
    client.user.setActivity('розробку 💻');
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.channel.id === process.env.DISCORD_CHANNEL_ID) {
        if (msg.content === 'ping') {
            msg.reply('Pong!');
        } else if (msg.content === `${PREFIX}cr`) {
            msg.channel.messages.fetch().then(messages => {
                messages.forEach((m, index) => {
                    setTimeout(() => {
                        m.delete()
                    }, index * 100)
                });
            });
        }
    }
});

// start
client.login(process.env.DISCORD_BOT_API_KEY);
app.listen(process.env.PORT || 3001, () => {
    console.log(`Discord app listening on port ${process.env.PORT || 3001}`);
});
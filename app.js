require('dotenv').config();

const Discord = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

if (!process.env.DISCORD_BOT_API_KEY ||
    !process.env.DISCORD_SERVER_ID ||
    !process.env.DISCORD_CHANNEL_ID ||
    !process.env.PORT) {
    console.log('Pls check api keys in .env file');
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

// start
client.login(process.env.DISCORD_BOT_API_KEY);
app.listen(process.env.PORT, () => {
    console.log(`Discord app listening on port ${process.env.PORT}`);
});
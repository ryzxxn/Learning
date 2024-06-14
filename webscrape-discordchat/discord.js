const { Client, GatewayIntentBits, Partials, ChannelType } = require('discord.js');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const express = require('express');

const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Channel]
});

const app = express();

// Define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('made by ryzxxn');
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`discordWebscraper, Started`);
});

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const TABLE = process.env.TABLE

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

discordClient.once('ready', () => {
    console.log(`Logged in as ${discordClient.user.tag}`);
});

discordClient.on('messageCreate', async message => {
    if (message.channel.id === CHANNEL_ID && message.channel.type === ChannelType.GuildText) {
        const messageData = {
            content: message.content,
            author: message.author.tag
        };
        const { data, error } = await supabase
            .from(TABLE)
            .insert([messageData]);
            if (error) {
                console.error('Error inserting message:', error.message);
            } else {
                console.log('Message inserted');
            }
    }
});

discordClient.login(TOKEN);
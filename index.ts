import { Client, Intents, Collection } from 'discord.js';
import super_client from './extensions/super_client';
const { prefix } = require('./extensions/preferences.json');

import dotenv from 'dotenv';
dotenv.config();

const client = new super_client();
client.once('ready', () => {

    console.log('\n\n  ❱❱ Online. \n');
    client.user!.setPresence({ activities: [{
        name: 'with the clouds',
        type: 'STREAMING',
        url: "https://www.twitch.tv/monstercat"
    }]});

    client.guilds.cache.forEach(guild => {
        console.log(`  ❱❱ Joined guild: ${guild.name}\n`);
    });

    client.commands = new Collection();
    client.aliases = new Collection();

    let handler = require('./extensions/command_handler')
    if (handler.default) handler = handler.default;
    handler(client);
})


client.on('messageCreate', async (message) => {

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.substring(prefix.length).split(" ");
    let cmd = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
    if(cmd.default) {
        cmd = cmd.default;
        cmd.run(client, message, args.slice(1));
    }
    
}) 

client.login(process.env.TOKEN); 
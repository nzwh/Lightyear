import { Collection } from 'discord.js';
import SuperClient from './extensions/super_client';
const { prefix } = require('./extensions/preferences.json');

import dotenv from 'dotenv';
dotenv.config();

const client = new SuperClient();
client.once('ready', () => {

    console.log('\n\n  ❱❱ Online. \n');
    client.user!.setPresence({ activities: [{
        name: 'the sky',
        type: 'WATCHING'
    }], status: 'dnd' });

    client.guilds.cache.forEach(guild => {
        console.log(`  ❱❱ Joined guild: ${guild.name}\n`);
    });

    client.commands = new Collection();
    client.aliases = new Collection();

    let handler = require('./extensions/command_handler');
    handler.default(client);
})


client.on('messageCreate', async (message) => {

    if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;

    const args = message.content.substring(prefix.length).split(" ");
    let cmd = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
    if(cmd) cmd.default.run(client, message, args.slice(1));
}) 

client.login(process.env.TOKEN); 
import { Collection } from 'discord.js';
import super_client from './extensions/super_client';

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
})

client.login(process.env.TOKEN); 
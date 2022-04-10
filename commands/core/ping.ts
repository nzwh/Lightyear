   
    import { Message } from 'discord.js';
    import SuperClient from '../../extensions/super_client';

    export default {
        run: async (client : SuperClient, message: Message, args: any[]) => {

            const msg = await message.reply({ allowedMentions: { repliedUser: false }, 
                content: '\`⚡ Pinging...\`'});
            msg.edit({ allowedMentions: { repliedUser: false }, 
                content: `\`⚡ Pong!  •  🏴 Latency: ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\``});
            
        },

        name: 'ping',
        alias: ['p', 'latency'],

        usage: "Returns the latency between the bot and the server.",
        status: 'AC',
        categ: (__dirname.split(/[\\/]/).pop()!).toUpperCase()
   }
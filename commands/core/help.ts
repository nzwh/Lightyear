   
    import Discord, { Message } from 'discord.js';
    import SuperClient from '../../extensions/super_client';
    const { prefix } = require('../../extensions/preferences.json');

    export default {
        run: async (client : SuperClient, message: Message, args: any[]) => {

            const catalog = new Discord.MessageEmbed()
                .setAuthor({ name: "Lightyear Commands" })
                .setDescription(`The prefix for the bot is \`${prefix}\`. Disclaimer: Most of the commands are experimental. Type \`${prefix}help [command]\` for more information.`)
                .setColor(message.guild!.me!.displayHexColor)

                .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.avatarURL()!.toString() })
                .setThumbnail(message.guild!.iconURL()!.toString())
                .setTimestamp()
                
            for (let command of client.commands) {

                let command_listing = "";
                command_listing += `\`${prefix + command[1].default.name}\` | \`${(command[1].default.alias).toString().replace(/,/g, '`, `')}\` \n`;
                command_listing += `\`⚡\` ${command[1].default.usage} \n\n`

                catalog.addField(`\u200b`, command_listing, true);
            }
            
            message.channel.send({ embeds: [catalog] });
        },

        name: 'help',
        alias: ['h'],

        usage: "Returns a list of commands and their usage.",
        status: 'IC',
        categ: (__dirname.split(/[\\/]/).pop()!).toUpperCase()
   }
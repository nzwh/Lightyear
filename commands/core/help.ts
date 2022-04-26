   
    import Discord, { Message } from 'discord.js';
    import SuperClient from '../../extensions/super_client';
    const { prefix } = require('../../extensions/preferences.json');

    export default {
        run: async (client : SuperClient, message: Message, args: any[]) => {
            
            if (client.commands.get(args[0]) === undefined) {

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
                
                message.reply({ embeds: [catalog], allowedMentions: { repliedUser: false } });
                
            } else {

                const command = client.commands.get(args[0]);
                const command_info = new Discord.MessageEmbed()
                    .setTitle(prefix + command.default.name)
                    .setDescription(`> ${command.default.usage} \n> \`⚡\` Aliases: \`${(command.default.alias).toString().replace(/,/g, '`, `')}\``)
                    .setColor(message.guild!.me!.displayHexColor)

                    .setFooter({ text: `Requested by ${message.author.username}` })
                    .setTimestamp()
                message.reply({ embeds: [command_info], allowedMentions: { repliedUser: false } });
            }
        },

        name: 'help',
        alias: ['h'],

        usage: "Returns a list of commands and their usage.",
        status: 'IC',
        categ: (__dirname.split(/[\\/]/).pop()!).toUpperCase()
   }
   
    import { Message } from 'discord.js';
    import SuperClient from '../../extensions/super_client';

    export default {
        run: async (client : SuperClient, message: Message, args: any[]) => {

        },

        name: 'help',
        alias: ['h'],

        usage: "Returns a list of commands and their usage.",
        status: 'IC',
        categ: (__dirname.split(/[\\/]/).pop()!).toUpperCase()
   }
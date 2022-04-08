    
    import { Client } from 'discord.js';
    import fs, { Dirent } from 'fs';

    // function to recursively grab the files
    const get_files = (dir: string, suffix: string, client: any) => {

        // load all the files inside the directory path [dir]
        const master : Dirent[] = fs.readdirSync(dir, { withFileTypes: true });
        for (const file of master) {

            // if the file is a directory [folder], recursively call get_files
            if (file.isDirectory()) {

                // disregard if the directory is empty
                let name = file.name.charAt(0).toUpperCase() + file.name.slice(1);
                if (fs.readdirSync(`${dir}/${file.name}`).length === 0) {
                    console.log(`  ❱❱ No commands in the ${name} folder to load.`);
                    
                } else {
                    console.log(`  ❱❱ Loading files from the ${name} folder.`);
                    get_files(`${dir}/${file.name}`, suffix, client);
                }
                
            // else, set the commands to the collection
            } else if (file.name.endsWith(suffix)) {
                
                const command = require(`../${dir}/${file.name}`);
                const command_name = file.name.substring(0, file.name.indexOf('.'));

                // if the command is already in the client.commands collection, log a warning
                if (client.commands.has(command_name)) {
                    console.log(`  ❱❱ The command ${command_name} is already loaded.`);
                } else {
                    client.commands.set(command_name, command);
                }

                // if the command has aliases, add them to the client.aliases collection
                if (command.default.help.alias) {
                for (const alias of command.default.help.alias) {
                    if (client.aliases.has(alias)) {
                        console.log(`  ❱❱ The alias ${alias} is already loaded.`);
                    } else {
                        client.aliases.set(alias, command_name);
                    }
                }
                }

            }
        }
    };

    export default (client: Client) => {
        get_files('commands', '.ts', client);
    }


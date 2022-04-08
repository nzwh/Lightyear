    
    import { Client } from 'discord.js';
    import fs, { Dirent } from 'fs';

    // recursively grabs the files
    const get_files = (dir: string, suffix: string, client: any) => {

        // load all the files inside the directory path [dir]
        const master : Dirent[] = fs.readdirSync(dir, { withFileTypes: true });

        // loop through all the files inside master
        for (const file of master) {

            // if the file is a directory [folder], recursively call get_files
            if (file.isDirectory()) {

                let name = file.name.charAt(0).toUpperCase() + file.name.slice(1);
                // disregard if the directory is empty
                if (fs.readdirSync(`${dir}/${file.name}`).length === 0) {
                    console.log(`  ❱❱ No commands in the ${name} folder to load.`);
                } else {
                    console.log(`  ❱❱ Loading files from the ${name} folder.`);
                    get_files(`${dir}/${file.name}`, suffix, client);
                }
                
            // else, push the filepaths inside the c_path array
            } else if (file.name.endsWith(suffix)) {
                
                const command = require(`../${dir}/${file.name}`);
                const command_name = file.name.substring(0, file.name.indexOf('.'));

                client.commands.set(command_name, command);
                command.help.aliases.forEach((alias: string) => {
                    client.aliases.set(alias, command.help.name);
                });
  
            }
        }
    };

    export default (client: Client) => {
        get_files('commands', '.ts', client);
    }


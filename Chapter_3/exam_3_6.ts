import fs from 'fs'
import path from 'path'

// Help command
const help = () => {
  const message = `
Usage: node lineCounter.js [--path=.] [--fileTypes=.js,.ts,.json] [--exclude=node_modules,tsconfig.ts,dist]

Options:

  --path [path]                      String, path to a folder. Default: current directory.
  --fileTypes [extensions]           String, comma separated file type extensions. Default: .js
  --exclude [file|folder names]      String, comma separated file and folder names. Default: node_modules
  --help                             Shows this help message
  `;

  console.log(message);
};

// Get args object
const getArgs = () => {
  const args = {
    path: '.',
    fileTypes: ['.js'],
    exclude: ['node_modules'],
    help: false
  };

  for (const option of process.argv.slice(2)) {
    // Invalid arguments
    if (!option.startsWith('--')) throw new Error(`Invalid arguments provided (${option})`);

    let [arg, value] = option.replace(/(--)|(")/g, '').split('=', 2);

    // Invalid values
    if (value === undefined) throw new Error('Invalid arguments provided');

    // Assign value in the args object
    if (arg === 'help')
      args[arg] = true;
    else if (arg === 'fileTypes' || arg === 'exclude')
      args[arg] = value.split(',');
    else if (arg === 'path')
      args[arg] = value;
  }
  return args;
};

// Count all lines in specified directory (recursively);
const countLines = async (directory: string, exclude: string[], fileTypes: string[]) => {
  try {
    let count = 0;
    const dirEntries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of dirEntries) {
      // Handle --exclude
      if (exclude.includes(entry.name)) continue;

      if (entry.isFile()) {
        // Handle --fileTypes
        if (fileTypes.reduce((prev, curr) => (entry.name.endsWith(curr) ? false : prev), true))
          continue;
        
        // Read the whole file
        const file = fs.readFileSync(path.join(directory, entry.name), { encoding: 'utf-8' });
        
        // Up the count by the amount of non empty lines
        count += file.split(/\r?\n/gm).filter(line => line.trim().length !== 0).length
      } else if (entry.isDirectory()) {
        count += await countLines(path.join(directory, entry.name), exclude, fileTypes);
      }
    }
    return count;
  } catch (e) {
    // If the path doesn't lead to a directory attempt to read a file there instead
    if ((e as NodeJS.ErrnoException).code === 'ENOTDIR') {
      try {
        const file = fs.readFileSync(directory, { encoding: 'utf-8' });
        return file.split(/\r?\n/gm).filter(line => line.trim().length !== 0).length
      } catch (e) {
        throw e;
      }
    }
    throw e;
  }
};

// Main
(async () => {
  try {
    const args = getArgs();

    if (args.help) {
      help();
      return;
    }

    const totalCount = await countLines(args.path, args.exclude, args.fileTypes);
    console.log(`Total lines: ${totalCount}`);
  } catch (e: any) {
    console.log('Error:');
    if (e.message) console.log(e.message);
  }
})();

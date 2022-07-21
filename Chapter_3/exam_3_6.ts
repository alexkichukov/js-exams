const fs = require('fs');
const path = require('path');

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

        // Read line by chunks and count the new lines (represented as 10 in utf-8)
        const stream = fs.createReadStream(path.join(directory, entry.name));
        for await (const chunk of stream) {
          let lastNewLine = -1;
          do {
            lastNewLine = chunk.indexOf(10, lastNewLine + 1);
            count++;
          } while (lastNewLine > 0);
        }
      } else if (entry.isDirectory()) {
        count += await countLines(path.join(directory, entry.name), exclude, fileTypes);
      }
    }
    return count;
  } catch (e) {
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

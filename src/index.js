import commander from 'commander';

import runMaze from './runner.js';

const program = new commander.Command();

program
  .command('run')
  .description('solve the maze')
  .option('-e,--entry <entry file>')
  .action((options) => {
    runMaze(options.entry);
  });

program.parse(process.argv);

import commander from 'commander';

import generateMaze from './lib/mazeGenerator';
import runMaze from './asyncRunner';
import runMazeSync from './syncRunner';

const program = new commander.Command();

program
  .command('gen')
  .description('generate your maze folder')
  .option('-d,--dir <maze dir>')
  .action((options) => {
    generateMaze(options.dir, 5, 4, 10);
  });

program
  .command('run')
  .description('solve the maze')
  .option('-e,--entry <entry file>')
  .option('-s,--sync')
  .action((options) => {
    if (options.sync) runMazeSync(options.entry);
    else runMaze(options.entry);
  });

program.parse(process.argv);

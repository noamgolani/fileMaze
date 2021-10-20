import commander from 'commander';

import runMaze from './runner.js';

const program = new commander.Command();

program.command('run').description('solve the maze').action(runMaze);

program.parse(process.argv);

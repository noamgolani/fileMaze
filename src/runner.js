/* eslint-disable consistent-return */
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

axios.defaults.baseURL = 'http://localhost:5000';

class Logger {
  constructor(baseDir) {
    this.baseDir = baseDir;
  }

  async log(msg) {
    await fs.appendFile(`${this.baseDir}/maze.log`, `${msg}/n`);
  }

  async logError(error) {
    await fs.appendFile(`${this.baseDir}/error.log`, `${error.message}/n`);
  }
}

const logger = new Logger('logs');

async function openChest(chestPath) {
  try {
    const response = await axios.get(`/chest?dir=${chestPath}`);
    logger.log(`Opened chest: ${chestPath}`);
    const { treasure, next } = response.data;
    if (treasure) return [true, { path: chestPath, content: treasure }];
    if (next) return [false, next];
  } catch (err) {
    throw new Error(`Cant open chest: ${chestPath}`);
  }
}

async function readMazeRoom(roomPath) {
  try {
    const response = await axios.get(`/room?dir=${roomPath}`);
    logger.log(`Entered: ${roomPath}`);
    const filesOrDir = response.data;

    const resList = await Promise.all(
      filesOrDir.map(async (item) => {
        const itemPath = path.join(roomPath, item);
        const response = await axios.get(`/stat?dir=${itemPath}`);
        const { isFile } = response.data;
        if (isFile) return [true, itemPath];
        return [false, itemPath];
      }),
    );
    console.log(resList);
    //        try {
    //          const chestContent = await openChest(itemPath);
    //          if (chestContent === 'found')
    //            fs.appendFile(logFile, `Found: ${itemPath}\n`);
    //          await readMazeRoom(chestContent);
    //        } catch (err) {
    //          logger.logError(err);
    //        }
  } catch (err) {
    logger.logError(err);
    throw Error(`Cant find the door to room: ${roomPath}`);
  }
}

export default function runMaze() {
  console.log('--- Running Async ---');
  try {
    readMazeRoom('/').then(() => {
      console.log('Read dat.log');
    });
  } catch (err) {
    console.log(err);
  }
}

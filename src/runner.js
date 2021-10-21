/* eslint-disable consistent-return */
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

axios.defaults.baseURL = 'http://localhost:5000';

class Logger {
  constructor(baseDir) {
    this.baseDir = baseDir;
    this.errPath = path.join(this.baseDir, 'error.log');
    this.logPath = path.join(this.baseDir, 'maze.log');

    fs.rm(this.errPath);
    fs.rm(this.logPath);
  }

  async log(msg) {
    await fs.appendFile(`${this.baseDir}/maze.log`, `${msg}\n`);
  }

  async logError(error) {
    await fs.appendFile(`${this.baseDir}/error.log`, `${error.message}\n`);
  }
}

const logger = new Logger('logs');

async function openChest(chestPath) {
  try {
    const response = await axios.get(`/chest?dir=${chestPath}`);
    logger.log(`Opened chest: ${chestPath}`);
    const { treasure, next } = response.data;
    if (treasure) {
      return { found: true, content: { path: chestPath, content: treasure } };
    }
    if (next) return { found: false, content: { next } };
  } catch (err) {
    throw new Error(`Cant open chest: ${chestPath}`);
  }
}

async function readMazeRoom(roomPath) {
  const response = await axios.get(`/room?dir=${roomPath}`);
  logger.log(`Entered: ${roomPath}`);
  const files = response.data.map((file) => path.join(roomPath, file));

  // Open all the files in the room
  const chestsContent = (await Promise.allSettled(files.map(openChest)))
    .filter((promiseReturn) => {
      if (promiseReturn.status === 'rejected') {
        logger.logError(promiseReturn.reason);
        return false;
      }
      return true;
    })
    .map(({ value }) => value);

  const foundContent = chestsContent.filter(({ found }) => found)[0];
  if (foundContent)
    return logger.log(
      `Found: ${foundContent.content.content} at: ${foundContent.content.path}`,
    );

  chestsContent.forEach(({ content: { next } }) => {
    readMazeRoom(next).catch((err) => logger.logError(err));
  });
}

export default function runMaze() {
  readMazeRoom('/')
    .then(() => {
      console.log(`Done! your logs are in: ${path.resolve(logger.baseDir)}`);
    })
    .catch((err) => {
      logger.logError(err);
      console.log(`Cant find a treasur! your logs are in: ${logger.baseDir}`);
    });
}

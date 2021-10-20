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
  const filesOrDir = response.data.map((item) => path.join(roomPath, item));

  const resList = await Promise.all(
    filesOrDir.map(async (itemPath) => {
      try {
        const {
          data: { isFile },
        } = await axios.get(`/stat?dir=${itemPath}`);
        if (isFile) return [true, itemPath];
        return [false, itemPath];
      } catch (err) {
        logger.logError(err);
      }
    }),
  );

  const chestPaths = resList.filter((res) => res[0]).map((res) => res[1]);
  const chestContList = await Promise.all(
    chestPaths.map(async (chestPath) => {
      try {
        return await openChest(chestPath);
      } catch (err) {
        logger.logError(err);
      }
    }),
  );

  await Promise.all(
    chestContList
      .filter((content) => content) // removes undefines from array
      .map(async ({ found, content }) => {
        try {
          if (found)
            return logger.log(`Found: ${content.content} at: ${content.path}`);
          await readMazeRoom(content.next);
        } catch (err) {
          logger.logError(err);
        }
      }),
  );
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

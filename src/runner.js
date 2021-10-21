/* eslint-disable consistent-return */
import axios from 'axios';
import path from 'path';
import pino from 'pino';

axios.defaults.baseURL = 'http://localhost:5000';

const logger = pino(
  {
    prettyPrint: {
      colorize: true,
    },
  },
  pino.destination('./log.log'),
);

async function openChest(chestPath) {
  try {
    const response = await axios.get(`/chest?dir=${chestPath}`);
    logger.info(`Opened chest: ${chestPath}`);
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
  logger.info(`Entered: ${roomPath}`);
  const files = response.data.map((file) => path.join(roomPath, file));

  // Open all the files in the room
  const chestsContent = (await Promise.allSettled(files.map(openChest)))
    .filter((promiseReturn) => {
      if (promiseReturn.status === 'rejected') {
        logger.error(promiseReturn.reason.message);
        return false;
      }
      return true;
    })
    .map(({ value }) => value);

  const foundContent = chestsContent.filter(({ found }) => found)[0];
  if (foundContent)
    return logger.info(
      `Found: ${foundContent.content.content} at: ${foundContent.content.path}`,
    );

  chestsContent.forEach(({ content: { next } }) => {
    readMazeRoom(next).catch((err) => {
      if (err.response)
        logger.error(`${err.response.status}: ${err.response.data.reason}`);
      else logger.error(err);
    });
  });
}

export default function runMaze() {
  readMazeRoom('/')
    .then(() => {
      console.log(`Done!`);
    })
    .catch((err) => {
      logger.error(err);
      console.log(`Cant find a treasur!`);
    });
}

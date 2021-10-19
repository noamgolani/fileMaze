import roomHandler from './handlers/room.js';
import statHandler from './handlers/stat.js';
import chestHandler from './handlers/chest.js';
import mazeHandler from './handlers/maze.js';
import { notFound } from './lib/helpers.js';

const handlersMap = {
  room: roomHandler,
  chest: chestHandler,
  stat: statHandler,
  maze: mazeHandler,
  404: notFound,
};

export default function handleRequest(req, res) {
  const { method, url, body } = req;
  console.log(
    `${method} Request to - ${url} \n\t Body: ${JSON.stringify(body)}`,
  );

  const withoutQuery = url.split('?')[0];
  const route = withoutQuery.split('/')[1];
  const handler = handlersMap[route] ? handlersMap[route] : handlersMap['404'];

  handler(req, res);
}

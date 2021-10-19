import roomHandler from './handlers/room';
import statHandler from './handlers/stat';
import chestHandler from './handlers/chest';
import mazeHandler from './handlers/maze';

export default function handleRequest(req, res) {
  const { method, url, body } = req;
  console.log(
    `${method} Request to - ${url} \n\t Body: ${JSON.stringify(body)}`,
  );

  const withoutQuery = url.split('?')[0];
  // TODO change to map
  switch (withoutQuery.split('/')[1]) {
    case 'room':
      roomHandler(req, res);
      break;
    case 'chest':
      chestHandler(req, res);
      break;
    case 'stat':
      statHandler(req, res);
      break;
    case 'maze':
      mazeHandler(req, res);
      break;
    default:
      res.writeHead(404, 'Page not found', {
        'content-type': 'application/json',
      });
      res.end();
      break;
  }
};

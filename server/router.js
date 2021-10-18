const fs = require('fs/promises');
const path = require('path');

function goodRes(res, data) {
  res.writeHead(200, 'Correct', {
    'content-type': 'application/json',
  });
  res.write(JSON.stringify(data));
  res.end();
}

function badRes(res, err) {
  res.writeHead(400, 'Correct', {
    'content-type': 'application/json',
  });
  res.write(JSON.stringify(err));
  res.end();
}

async function roomHandler(req, res) {
  const { query } = req;

  try {
    const dirData = await fs.readdir(
      path.join(__dirname, '../maze', query.dir)
    );
    goodRes(res, dirData);
  } catch (err) {
    badRes(res, err);
  }
}

module.exports.handleRequest = (req, res) => {
  const { method, url, body } = req;
  console.log(
    `${method} Request to - ${url} \n\t Body: ${JSON.stringify(body)}`
  );

  const withoutQuery = url.split('?')[0];
  switch (withoutQuery.split('/')[1]) {
    case 'room':
      roomHandler(req, res);
      break;
    case 'chest':
      chestHandler(req, res);
      break;
    default:
      res.writeHead(404, 'Page not found', {
        'content-type': 'application/json',
      });
      res.end();
      break;
  }
};

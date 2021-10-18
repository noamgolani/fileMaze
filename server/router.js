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
      path.join(__dirname, '../maze', query.dir),
    );
    goodRes(res, dirData);
  } catch (err) {
    badRes(res, err);
  }
}

async function chestHandler(req, res) {
  const { query } = req;

  try {
    const fileData = await fs.readFile(
      path.join(__dirname, '../maze', query.dir),
    );
    goodRes(res, JSON.parse(fileData.toString()));
  } catch (err) {
    badRes(res, err);
  }
}

async function statHandler(req, res) {
  const { query } = req;

  try {
    const statData = await fs.lstat(
      path.join(__dirname, '../maze', query.dir),
    );
    goodRes(res, statData);
  } catch (err) {
    badRes(res, err);
  }
}

module.exports.handleRequest = (req, res) => {
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
    default:
      res.writeHead(404, 'Page not found', {
        'content-type': 'application/json',
      });
      res.end();
      break;
  }
};

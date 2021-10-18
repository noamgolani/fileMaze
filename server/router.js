module.exports.handleRequest = (req, res) => {
  const { method, url, body } = req;
  console.log(
    `${method} Request to - ${url} \n\t Body: ${JSON.stringify(body)}`
  );

  switch (url.split('/')[1]) {
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

function roomHandler(req, res) {
  res.writeHead(200, 'Correct', {
    'content-type': 'application/json',
  });
  res.write(JSON.stringify({ check: 'aa' }));
  res.end();
}

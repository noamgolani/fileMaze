export function goodRes(res, data) {
  res.writeHead(200, 'Correct', {
    'content-type': 'application/json',
  });
  res.write(JSON.stringify(data));
  res.end();
}

export function badRes(res, err) {
  console.log(err);
  res.writeHead(400, err.message, {
    'content-type': 'application/json',
  });
  res.write(JSON.stringify(err));
  res.end();
}

export function notFound(req, res) {
  res.writeHead(404, 'Page not found', {
    'content-type': 'application/json',
  });
  res.end();
}

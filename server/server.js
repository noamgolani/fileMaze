import http from 'http';
import handleRequest from './router.js';

const hostname = '127.0.0.1';
const port = 5000;

function parseQuery(req) {
  const queryString = req.url.split('?')[1];
  if (!queryString) return {};
  const query = {};
  queryString.split('&').forEach((str) => {
    const spl = str.split('=');
    query[spl[0]] = spl[1];
  });
  return query;
}

http
  .createServer((req, res) => {
    let body = [];

    req
      .on('error', (err) => {
        console.error(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        try {
          body = JSON.parse(Buffer.concat(body).toString());
          req.body = body;
        } catch {
          req.body = {};
        }
        req.query = parseQuery(req);
        handleRequest(req, res);
      });
  })
  .listen(5000, () => {
    console.log(`Running on http://${hostname}:${port}...`);
  });

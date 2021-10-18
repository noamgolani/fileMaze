const http = require('http');
const router = require('./router');

const hostname = '127.0.0.1';
const port = 5000;

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
        body = Buffer.concat(body).toJSON().data;
        req.body = body;
        router.handleRequest(req, res);
      });
  })
  .listen(5000, () => {
    console.log(`Running on http://${hostname}:${port}...`);
  });

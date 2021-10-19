import http from 'http';
import { URLSearchParams } from 'url';
import { logError } from './lib/logger.js';
import handleRequest from './router.js';

const hostname = '127.0.0.1';
const port = 5000;

http
  .createServer((req, res) => {
    let body = [];

    req
      .on('error', (err) => {
        logError(err);
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
        req.query = new URLSearchParams(req.url.split('?')[1]);
        handleRequest(req, res);
      });
  })
  .listen(5000, () => {
    // eslint-disable-next-line no-console
    console.log(`Running on http://${hostname}:${port}...`);
  });

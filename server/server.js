const http = require('http');

http
  .createServer((req, res) => {
    res.write('Hello From Server');
    res.end();
  })
  .listen(5000, () => {
    console.log('Running on http://localhost:5000...');
  });

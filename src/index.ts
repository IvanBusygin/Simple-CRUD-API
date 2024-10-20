import http from 'http';

const port = 4000;

export const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
  }
});

server.listen(port, () => {
  console.log(`Server Listening on http://localhost:${port}/`);
});

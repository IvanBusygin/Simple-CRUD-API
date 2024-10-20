import { createServer } from 'http';
import { server } from './server/server';

const port = 4000;

createServer((req, res) => {
  server(req, res);
}).listen(port, () => {
  console.log(`Server Listening on http://localhost:${port}/`);
});

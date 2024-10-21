import 'dotenv/config';
import { createServer } from 'http';
import { server } from './server/server';

const port = process.env.PORT ?? 4000;

createServer(async (req, res) => {
  await server(req, res);
}).listen(port, () => {
  console.log(`Server Listening on http://localhost:${port}/`);
});

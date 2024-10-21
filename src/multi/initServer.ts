import 'dotenv/config';
import { createServer } from 'http';
import { handleMessage } from '../database/db';
import { server } from '../server/server';

export const LOAD_PORT = 4000;

export const initServer = (workerId?: number) => {
  process.on('message', handleMessage);

  const HTTPServer = createServer(async (request, response) => {
    await server(request, response);
  });

  if (workerId) {
    const port = LOAD_PORT + workerId;
    HTTPServer.listen(port, () => {
      console.log(`Worker ${process.pid} running on http://localhost:${port}/`);
    });
  } else {
    const port = LOAD_PORT;
    HTTPServer.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/`);
    });
  }
};

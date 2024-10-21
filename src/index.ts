import 'dotenv/config';
import { createServer } from 'http';
import cluster from 'cluster';
import { server } from './server/server';
import { handleMessage, users } from './database/db';
import { initServer } from './multi/initServer';
import { numCPUs } from './multi/helpers';

const port = process.env.PORT ?? 4000;

if (process.env.MULTI && cluster.isPrimary) {
  console.log(`Master process ${process.pid} is running`);

  for (let i = 1; i < numCPUs; i++) {
    cluster.fork({ WORKER_ID: i });
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker process ${worker.process.pid} died. Restarting...`);
    cluster.fork({ WORKER_ID: worker.id });
  });

  cluster.on('message', (_worker, message) => {
    handleMessage(message);

    Object.values(cluster.workers!).forEach((worker) => {
      worker?.send({ type: 'updatedDB', data: users });
    });
  });

  initServer();
} else if (process.env.MULTI && cluster.isWorker) {
  process.on('message', handleMessage);

  initServer(Number(process.env.WORKER_ID));
} else {
  createServer(async (req, res) => {
    await server(req, res);
  }).listen(port, () => {
    console.log(`Server Listening on http://localhost:${port}/`);
  });
}

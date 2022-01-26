import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaCors from 'koa2-cors';
import { registerRoutes } from './routes';
import { createServer } from 'https';
import { Server } from 'socket.io';
import { global } from './socket/global';

async function serverSetUp() {
  const server: Koa = new Koa();
  middleWares(server);
  await startServer(server);
}

function middleWares(server: Koa) {
  server.use(bodyParser());
  server.use(koaCors());

  const routes = registerRoutes().routes();
  server.use(routes);
}

async function startServer(server: Koa) {
  try {
    //https://socket.io/docs/v4/server-initialization/
    const serverPort = 5000;
    const httpServer = createServer(server.callback());
    const io = new Server(httpServer);
    global(io);
    httpServer.listen(serverPort, () => {
      console.log(`Server running on port ${serverPort}`);
    });
  } catch (error) {
    console.log(error);
  }
}

export { serverSetUp };

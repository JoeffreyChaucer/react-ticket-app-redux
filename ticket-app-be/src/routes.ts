import Router from 'koa-router';

import { Auth } from './controllers/auth/auth';

export function registerRoutes() {
  const router = new Router();

  //Define routers

  //  Auth routes
  router.post('/register', Auth.prototype.create);
  return router;
}

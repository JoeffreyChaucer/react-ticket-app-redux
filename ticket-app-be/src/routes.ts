import Router from 'koa-router';

import { Auth } from './controllers/auth/auth';
import { Ticket } from './controllers/ticket/ticket';
import { verifyToken } from './helpers/auth';

export function registerRoutes() {
  const router = new Router();

  //Define routers

  //  Auth routes
  router.post('/register', Auth.prototype.create);
  router.post('/login', Auth.prototype.login);

  // Ticket routes
  router.get('/tickets', verifyToken, Ticket.prototype.getAllTickets);
  router.post('/tickets/add', verifyToken, Ticket.prototype.addTicket);

  return router;
}

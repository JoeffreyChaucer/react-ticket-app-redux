import Router from 'koa-router';

import { Auth } from './controllers/auth/auth';
import { Ticket } from './controllers/ticket/ticket';
import { User } from './controllers/user/user';
import { verifyToken } from './helpers/auth';

export function registerRoutes() {
  const router = new Router();

  //Define routers

  //  Auth routes
  router.post('/register', Auth.prototype.create);
  router.post('/login', Auth.prototype.login);

  // User routes
  router.get('/user', verifyToken, User.prototype.getUser);

  // Ticket routes
  router.get('/tickets', verifyToken, Ticket.prototype.getAllTickets);
  router.post('/tickets/add', verifyToken, Ticket.prototype.addTicket);
  router.put('/tickets/:id', verifyToken, Ticket.prototype.editTicket);
  router.delete('/tickets/:_id', verifyToken, Ticket.prototype.deleteTicket);
  router.put('/tickets/mark-ticket/:id', verifyToken, Ticket.prototype.closeTicket);

  return router;
}

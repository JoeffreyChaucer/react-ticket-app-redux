import { Context } from 'koa';
import Joi from '@hapi/joi';
import { ITicket } from '../../interface/ticket.interface';
import { TicketModel } from '../../models/ticket/Ticket.model';
import { UserModel } from '../../models/user/User.model';

const RANDOM_VALUE_MULTIPLIER = 1001;

export class Ticket {
  public async addTicket(ctx: Context): Promise<void> {
    try {
      const body: ITicket = ctx.request.body;

      //Validate ticketSchema required properties
      const schema = Joi.object().keys({
        fullName: Joi.string().required(),
        email: Joi.string().required(),
        subject: Joi.string().required(),
        description: Joi.string().required(),
        department: Joi.string().required(),
        priority: Joi.string().required(),
      });
      const value: ITicket = await schema.validateAsync(body);

      //Get Id of the user who created the ticket
      const { id } = ctx.state.user;

      //Set ITicket->user equal to user's Id
      value.user = id;
      //Set ITicket->ticketId equal to 5 random number value
      value.ticketId = `${Math.floor(Math.random() * RANDOM_VALUE_MULTIPLIER)}`;
      //Create the ticket
      const ticket = await TicketModel.create(value);

      if (ticket) {
        //Update _id equal to user state id
        await UserModel.updateOne(
          { _id: id },

          {
            //Push the key(ticket) and the value(ticket._id) Ref ticket to userSchema tickets array
            $push: {
              tickets: {
                ticket: ticket._id,
              },
            },
          }
        );
        //Pass the message and the ticket
        ctx.body = { message: 'Ticket added successfully', ticket };
      }
    } catch (error) {
      ctx.body = error;
    }
  }
}

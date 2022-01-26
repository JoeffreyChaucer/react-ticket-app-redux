import { Context } from 'koa';
import Joi from '@hapi/joi';
import { ITicket } from '../../interface/ticket.interface';
import { TicketModel } from '../../models/ticket/Ticket.model';
import { UserModel } from '../../models/user/User.model';

const RANDOM_VALUE_MULTIPLIER = 1001;

export class Ticket {
  public async getAllTickets(ctx: Context): Promise<void> {
    try {
      const tickets = await TicketModel.find({}).sort({ created: -1 });
      ctx.body = { message: 'All tickets', tickets };
    } catch (error) {
      ctx.body = error;
    }
  }

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

  public async editTicket(ctx: Context): Promise<void> {
    try {
      const body: ITicket = ctx.request.body;
      //Get the id
      const { id } = ctx.params;
      //Validate ticketSchema optional properties
      const schema = Joi.object().keys({
        fullName: Joi.string().optional(),
        email: Joi.string().optional(),
        subject: Joi.string().optional(),
        description: Joi.string().optional(),
        department: Joi.string().optional(),
        priority: Joi.string().optional(),
      });
      const value: ITicket = await schema.validateAsync(body);
      // Update ticket
      await TicketModel.updateOne(
        // Find the ticket using mongoDb auto generated _id
        {
          _id: id,
        },
        // Values to be updated
        {
          fullName: value.fullName,
          email: value.email,
          subject: value.subject,
          description: value.subject,
          department: value.department,
          priority: value.priority,
        }
      );

      ctx.body = { message: 'Ticket updated successfully' };
    } catch (error) {
      ctx.body = error;
    }
  }

  public async deleteTicket(ctx: Context): Promise<void> {
    try {
      //Get ticket id from the params
      const { _id } = ctx.params;
      //Get id of the user that wants to delete the ticket
      const { id } = ctx.state.user;

      //Delete ticket from the ticketModel
      await TicketModel.deleteOne({ _id });
      //Remove ticket id value from the userModel->tickets array
      await UserModel.updateOne(
        {
          _id: id,
        },
        {
          $pull: {
            tickets: {
              ticket: _id,
            },
          },
        }
      );

      ctx.body = { message: 'Ticket deleted successfully' };
    } catch (error) {
      ctx.body = error;
    }
  }

  public async closeTicket(ctx: Context): Promise<void> {
    try {
      //Get ticket id from the params
      const { _id } = ctx.params;

      //Update Ticket status to closed
      await TicketModel.updateOne(
        { _id },
        {
          status: 'Closed',
          closed: true,
          dueDate: new Date(),
        }
      );

      ctx.body = { message: 'Ticket closed successfully' };
    } catch (error) {
      ctx.body = error;
    }
  }
}

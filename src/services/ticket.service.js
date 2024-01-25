import TicketDao from "../dao/ticket.mongodb.dao.js";

export default class TicketService {
  static create(data) {
    const randomCode = Math.random().toString(36).toUpperCase();
    const newTicket = {
      ...data,
      code: randomCode,
    };

    TicketDao.create(newTicket);
  }
}

import ticketModel from "./models/ticket.model.js";

export default class TicketMongoDbDao {
  static getById(tid) {
    return ticketModel.findById(tid);
  }

  static create(data) {
    return ticketModel.create(data);
  }
}

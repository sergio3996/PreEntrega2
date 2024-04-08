import TicketDao from "../dao/ticket.mongodb.dao.js";
import emailService from "./email.service.js";

export default class TicketService {
  static async create(data) {
    const randomCode = Math.random().toString(36).toUpperCase();
    const newTicket = {
      ...data,
      code: randomCode,
    };

    try {
      const result = await TicketDao.create(newTicket);
      console.log(result);
      await emailService.sendMail(
        data.purchaser,
        "Compra realizada con exito",
        `<p>Aqui esta la informacion de su compra</p>
         <p>Email de compra: ${result.purchaser}</p>
         <p>Codigo de compra: ${result.code}</p>
         <p>Monto: $${result.amount}</p>`
      );
    } catch (error) {
      throw new Error("No se ha podido crear el ticket");
    }
  }
}

import MessageDao from "../dao/message.mongodb.dao.js";

export default class MessageService {
  static async get() {
    const messages = await MessageDao.get();
    return messages;
  }

  static async newMessage(data) {
    const message = await MessageDao.create(data);
    if (!message) {
      throw new Error("Ha habido un error al enviar el mensaje");
    }
  }
}

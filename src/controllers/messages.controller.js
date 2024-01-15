import messageModel from "../dao/models/message.model.js";

export default class MessagesController {
  static get() {
    return messageModel.find();
  }

  static async add(message) {
    try {
      await messageModel.create(message);
    } catch (error) {
      console.error(error.message);
    }
  }
}

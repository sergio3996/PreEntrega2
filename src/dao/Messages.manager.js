import messageModel from "./models/message.model.js";

export default class MessagesManager {
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

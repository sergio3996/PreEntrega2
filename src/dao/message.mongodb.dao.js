import messageModel from "./models/message.model.js";

export default class MessageMongoDbDao {
  static get(criteria = {}) {
    return messageModel.find(criteria);
  }

  static create(data) {
    return messageModel.create(data);
  }
}

import userModel from "./models/user.model.js";

export default class UserMongoDbDao {
  static getByEmail(email) {
    return userModel.findOne({ email: email }).populate("cart");
  }

  static create(data) {
    return userModel.create(data);
  }

  static update(email, data) {
    const criteria = { email: email };
    const operation = { $set: data };
    return userModel.updateOne(criteria, operation);
  }
}

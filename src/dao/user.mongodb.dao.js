import userModel from "./models/user.model.js";

export default class UserMongoDbDao {
  static getByEmail(email) {
    return userModel.findOne({ email: email }).populate("cart");
  }

  static create(data) {
    return userModel.create(data);
  }
}

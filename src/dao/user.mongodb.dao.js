import userModel from "./models/user.model.js";

export default class UserMongoDbDao {
  static get(criteria = {}) {
    return userModel.find(criteria);
  }

  static getById(uid) {
    return userModel.findById(uid);
  }
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

  static deleteMany(criteria = {}) {
    return userModel.deleteMany(criteria);
  }

  static delete(uid) {
    return userModel.deleteOne({ _id: uid });
  }
}

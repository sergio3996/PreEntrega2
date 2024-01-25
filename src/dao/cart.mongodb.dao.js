import cartModel from "./models/cart.model.js";

export default class CartMongoDbDao {
  static getAll(criteria = {}) {
    return cartModel.find(criteria);
  }

  static getById(cid) {
    return cartModel.findById(cid).populate("products.product");
  }

  static create() {
    return cartModel.create({});
  }

  static updateById(cid, data) {
    const criteria = { _id: cid };
    const operation = { $set: data };
    return cartModel.updateOne(criteria, operation);
  }
}

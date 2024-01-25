import productModel from "./models/product.model.js";

export default class ProductMongoDbDao {
  static get(criteria = {}) {
    return productModel.find(criteria);
  }

  static getById(pid) {
    return productModel.findById(pid);
  }

  static create(data) {
    return productModel.create(data);
  }

  static updateById(pid, data) {
    const criteria = { _id: pid };
    const operation = { $set: data };
    return productModel.updateOne(criteria, operation);
  }

  static delete(pid) {
    return productModel.deleteOne({ _id: pid });
  }

  static paginate(criteria, options) {
    return productModel.paginate(criteria, options);
  }
}

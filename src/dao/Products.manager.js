import productModel from "./models/product.model.js";

export default class ProductsManager {
  static get() {
    return productModel.find();
  }

  static async getById(pid) {
    try {
      const product = await productModel.findById(pid);
      return product;
    } catch (error) {
      console.error(error.message);
    }
  }

  static async create(data) {
    try {
      const product = await productModel.create(data);
      console.log(`Producto agregado correctamente ${product._id}`);
      return product;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  static async updateById(pid, data) {
    try {
      await productModel.updateOne({ _id: pid }, { $set: data });
      console.log("Producto actualizado correctamente");
    } catch (error) {
      console.error(error.message);
    }
  }

  static async deleteById(pid) {
    try {
      await productModel.deleteOne({ _id: pid });
      console.log("Producto eliminado correctamente");
    } catch (error) {
      console.error(error.message);
    }
  }
}

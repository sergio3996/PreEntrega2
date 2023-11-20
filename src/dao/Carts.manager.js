import cartModel from "./models/cart.model.js";

export default class CartsManager {
  static get() {
    return cartModel.find();
  }

  static async getProductsInCart(cid) {
    try {
      const cart = await cartModel.findById(cid);
      return cart.products;
    } catch (error) {
      console.error(error.message);
    }
  }

  static async create() {
    try {
      const cart = await cartModel.create({});
      console.log(`Carrito creado ${cart._id}`);
      return cart;
    } catch (error) {
      console.error(error.message);
    }
  }

  static async addProductToCart(cid, productId) {
    let product = { _id: productId, quantity: 1 };
    try {
      const productCart = await cartModel.findOne({
        _id: cid,
        "products._id": productId,
      });

      if (!productCart) {
        await cartModel.updateOne(
          { _id: cid },
          { $push: { products: product } }
        );
        console.log("Producto agregado al carrito con exito!");
      } else {
        await cartModel.updateOne(
          { _id: cid, "products._id": productId },
          { $inc: { "products.$.quantity": 1 } }
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}

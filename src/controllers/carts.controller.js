import cartModel from "../dao/models/cart.model.js";

export default class CartsController {
  static get() {
    return cartModel.find();
  }

  static async getProductsInCart(cid) {
    try {
      const cart = await cartModel.findById(cid).populate("products.product");
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
    try {
      const cart = await cartModel.findById({ _id: cid });
      const productFound = cart.products.find(
        (elem) => elem.product == productId
      );
      if (!productFound) {
        cart.products.push({ product: productId });
        await cartModel.updateOne({ _id: cid }, { $set: cart });
        console.log("Producto agregado al carrito con exito!");
      } else {
        productFound.quantity += 1;
        await cartModel.updateOne({ _id: cid }, { $set: cart });
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  static async deleteProductsInCart(cid) {
    try {
      const cart = await cartModel.findById({ _id: cid });
      cart.products = [];
      await cartModel.updateOne({ _id: cid }, { $set: cart });
      console.log("Productos eliminados del carrito");
    } catch (error) {
      console.error(error.message);
    }
  }

  static async deleteProductById(cid, pid) {
    try {
      const cart = await cartModel.findById({ _id: cid });
      const productFound = cart.products.find((elem) => elem.product == pid);
      if (productFound) {
        const newProductList = cart.products.filter(
          (elem) => elem.product != pid
        );
        cart.products = newProductList;
        await cartModel.updateOne({ _id: cid }, { $set: cart });
        console.log("Producto eliminado del carrito con exito!");
      } else {
        console.log("Producto no encontrado");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  static async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await cartModel.findById({ _id: cid });
      const productFound = cart.products.find((elem) => elem.product == pid);
      if (productFound) {
        productFound.quantity = quantity;
        await cartModel.updateOne({ _id: cid }, { $set: cart });
        console.log("Producto actualizado con exito!");
      } else {
        console.log("Producto no encontrado");
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}

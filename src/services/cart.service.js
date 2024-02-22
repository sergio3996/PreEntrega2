import CartDao from "../dao/cart.mongodb.dao.js";
import ProductMongoDbDao from "../dao/product.mongodb.dao.js";
import ProductService from "./product.service.js";
import TicketService from "./ticket.service.js";

export default class CartService {
  static async getAll() {
    const carts = await CartDao.getAll();
    if (carts <= 0) {
      throw new Error("No existe ningun carrito 😫");
    }
    return carts;
  }

  static async getCartProducts(cid) {
    const cart = await CartDao.getById(cid);
    if (!cart) {
      throw new Error("Carrito no encontrado 😥");
    }
    if (cart.products.length <= 0) {
      throw new Error("La lista de productos esta vacia 😫");
    }
    return cart.products;
  }

  static create() {
    return CartDao.create();
  }

  static async addToCart(cid, pid, user) {
    const cart = await CartDao.getById(cid);
    if (!cart) {
      throw new Error("Carrito no encontrado 😥");
    }
    const product = await ProductMongoDbDao.getById(pid);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    if (product.owner === user.email) {
      throw new Error(
        "No puede agregar a su carrito un producto que le pertenece"
      );
    }
    const productFound = cart.products.find((elem) => elem.product == pid);
    if (!productFound) {
      cart.products.push({ product: pid });
      await CartDao.updateById(cid, cart);
    } else {
      productFound.quantity += 1;
      await CartDao.updateById(cid, cart);
    }
  }

  static async clearCart(cid) {
    const cart = await CartDao.getById(cid);
    if (!cart) {
      throw new Error("Carrito no encontrado 😥");
    }
    cart.products = [];
    await CartDao.updateById(cid, cart);
  }

  static async removeFromCart(cid, pid) {
    const cart = await CartDao.getById(cid);
    if (!cart) {
      throw new Error("Carrito no encontrado 😥");
    }
    cart.products.forEach((elem) => console.log(elem.product._id));
    const productFound = cart.products.find((elem) => elem.product._id == pid);
    if (productFound) {
      const newProductList = cart.products.filter(
        (elem) => elem.product._id != pid
      );
      cart.products = newProductList;
      await CartDao.updateById(cid, cart);
    } else {
      throw new Error("Producto no encontrado 😥");
    }
  }

  static async updateCartItemQuantity(cid, pid, quantity) {
    const cart = await CartDao.getById(cid);
    if (!cart) {
      throw new Error("Carrito no encontrado 😥");
    }
    const productFound = cart.products.find((elem) => elem.product._id == pid);
    if (productFound) {
      productFound.quantity = quantity;
      await CartDao.updateById(cid, cart);
    } else {
      throw new Error("Producto no encontrado 😥");
    }
  }

  static async completePurchase(cid, user) {
    const cart = await CartDao.getById(cid);
    if (!cart) {
      throw new Error("Carrito no encontrado 😥");
    }

    const availableProducts = cart.products.filter(
      (item) => item.product.stock >= item.quantity
    );

    if (availableProducts.length > 0) {
      availableProducts.forEach(async (item) => {
        item.product.stock = item.product.stock - item.quantity;
        await ProductService.updateById(item.product._id, {
          ...item.product,
        });
      });

      const total = availableProducts.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );

      const newTicket = {
        amount: total,
        purchaser: user,
      };

      TicketService.create(newTicket);

      cart.products = cart.products.filter(
        (item) => item.product.stock < item.quantity
      );
      await CartDao.updateById(cid, cart);
      if (cart.products.length > 0) {
        return cart.products;
      }
    } else {
      throw new Error(
        "No hay productos con stock disponible en la lista de compra"
      );
    }
  }
}

import * as fs from "fs";

class CartManager {
  constructor() {
    this.carts = [];
    this.path = "./carrito.json";
  }

  getCarts() {
    if (!fs.existsSync(this.path)) {
      console.log("La lista de carritos no existe");
      return this.carts;
    } else {
      const data = fs.readFileSync(this.path, "utf8");
      this.carts = JSON.parse(data);
      return this.carts;
    }
  }

  generateCartId() {
    return Math.random().toString(36).slice(2, 11);
  }

  async addCart() {
    try {
      await this.getCarts();

      const uniqueId = this.generateCartId();
      const newCart = {
        id: uniqueId,
        products: [],
      };
      this.carts.push(newCart);
      fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2), "utf8");
    } catch (error) {
      console.error(error);
    }
  }

  async getProductsInCart(id) {
    try {
      await this.getCarts();
      const cart = this.carts.find((cart) => cart.id === id);
      return cart.products;
    } catch (error) {
      console.error(error);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      await this.getCarts();

      const cart = this.carts.find((cart) => cart.id === cartId);

      const duplicateProduct = cart.products.find(
        (product) => product.id === productId
      );

      if (duplicateProduct) {
        duplicateProduct.quantity += 1;
      } else {
        const newProduct = {
          id: productId,
          quantity: 1,
        };
        cart.products.push(newProduct);
      }

      fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2), "utf8");
    } catch (error) {
      console.error(error);
    }
  }
}

export default CartManager;

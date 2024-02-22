import CartService from "../services/cart.service.js";

export const getCarts = async (req, res) => {
  const carts = await CartService.getAll();
  return res.status(200).json(carts);
};

export const createCart = async (req, res) => {
  const cart = await CartService.create();
  return res.status(201).json(`Carrito con ID: ${cart._id} creado con exito`);
};

export const getCartProducts = async (req, res) => {
  const { cid } = req.params;
  try {
    const products = await CartService.getCartProducts(cid);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const addToCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    await CartService.addToCart(cid, pid, req.user);
    return res.status(200).json("Producto agregado al carrito");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const removeFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    await CartService.removeFromCart(cid, pid);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const clearCart = async (req, res) => {
  const { cid } = req.params;
  try {
    await CartService.clearCart(cid);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateCartItemQuantity = async (req, res) => {
  const { quantity } = req.body;
  const { cid, pid } = req.params;
  try {
    await CartService.updateCartItemQuantity(cid, pid, quantity);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const completePurchase = async (req, res) => {
  const { email } = req.user;
  const { cid } = req.params;
  try {
    const products = await CartService.completePurchase(cid, email);
    if (products) {
      return res.status(200).json(
        `Compra realizada con exito. Productos que quedaron fuera de la compra por falta de stock: ${products.map(
          (item) => {
            return item.product.title;
          }
        )} `
      );
    }
    return res.status(200).json("Compra realizada con exito");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

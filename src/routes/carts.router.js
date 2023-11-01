import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();
const CartManagerInstance = new CartManager();

router.post("/", (req, res) => {
  CartManagerInstance.addCart();
  res.status(201).json({ message: "Carrito creado con exito!" });
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const products = await CartManagerInstance.getProductsInCart(cid);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
  }
});

router.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  CartManagerInstance.addProductToCart(cid, pid);
  res.status(201).json({ message: "Producto agregado correctamente!" });
});

export default router;

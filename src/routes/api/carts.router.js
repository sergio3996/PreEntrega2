import { Router } from "express";
import CartsManager from "../../dao/Carts.manager.js";

const router = Router();

router.get("/", async (req, res) => {
  const carts = await CartsManager.get();
  res.status(200).json(carts);
});

router.post("/", async (req, res) => {
  const cart = await CartsManager.create();
  res.status(201).json(cart);
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const products = await CartsManager.getProductsInCart(cid);
  res.status(200).json(products);
});

router.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  await CartsManager.addProductToCart(cid, pid);
  res.status(201).json("Producto agregado al carrito");
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  await CartsManager.deleteProductById(cid, pid);
  res.status(204).end();
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  await CartsManager.deleteProductsInCart(cid);
  res.status(204).end();
});

router.put("/:cid/product/:pid", async (req, res) => {
  const { quantity } = req.body;
  const { cid, pid } = req.params;
  await CartsManager.updateProductQuantity(cid, pid, quantity);
  res.status(204).end();
});

export default router;

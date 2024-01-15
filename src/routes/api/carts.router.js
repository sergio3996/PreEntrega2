import { Router } from "express";
import CartsController from "../../controllers/carts.controller.js";

const router = Router();

router.get("/", async (req, res) => {
  const carts = await CartsController.get();
  res.status(200).json(carts);
});

router.post("/", async (req, res) => {
  const cart = await CartsController.create();
  res.status(201).json(cart);
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const products = await CartsController.getProductsInCart(cid);
  res.status(200).json(products);
});

router.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  await CartsController.addProductToCart(cid, pid);
  res.status(201).json("Producto agregado al carrito");
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  await CartsController.deleteProductById(cid, pid);
  res.status(204).end();
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  await CartsController.deleteProductsInCart(cid);
  res.status(204).end();
});

router.put("/:cid/product/:pid", async (req, res) => {
  const { quantity } = req.body;
  const { cid, pid } = req.params;
  await CartsController.updateProductQuantity(cid, pid, quantity);
  res.status(204).end();
});

export default router;

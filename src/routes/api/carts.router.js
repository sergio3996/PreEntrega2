import { Router } from "express";
import CartsManager from "../../dao/Carts.manager.js";
// import CartManager from "../../dao/CartManagerFS.js";

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

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  await CartsManager.addProductToCart(cid, pid);
  res.status(201).json("Producto agregado al carrito");
});

export default router;

// const CartManagerInstance = new CartManager();

// router.post("/", (req, res) => {
//   CartManagerInstance.addCart();
//   res.status(201).json({ message: "Carrito creado con exito!" });
// });

// router.get("/:cid", async (req, res) => {
//   const { cid } = req.params;
//   try {
//     const products = await CartManagerInstance.getProductsInCart(cid);
//     res.status(200).json(products);
//   } catch (error) {
//     console.error(error);
//   }
// });

// router.post("/:cid/product/:pid", (req, res) => {
//   const { cid, pid } = req.params;
//   CartManagerInstance.addProductToCart(cid, pid);
//   res.status(201).json({ message: "Producto agregado correctamente!" });
// });

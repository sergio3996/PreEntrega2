import express from "express";
import ProductsManager from "../../dao/Products.manager.js";
// import ProductManager from "../../dao/ProductManagerFS.js";

const router = express.Router();

// const ProductManagerInstance = new ProductManager();

router.get("/", async (req, res) => {
  const products = await ProductsManager.get();
  res.render("index", { products: products.map((item) => item.toJSON()) });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

router.get("/chat", (req, res) => {
  res.render("chat", {});
});

export default router;

import express from "express";
import ProductsManager from "../../dao/Products.manager.js";
import CartsManager from "../../dao/Carts.manager.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  const { limit = 10, page = 1, sort, category } = req.query;
  const criteria = {};
  const options = { limit, page };
  const url = "http://localhost:8080/products";
  if (sort) {
    options.sort = { price: sort };
  }
  if (category) {
    criteria.category = category;
  }
  const result = await ProductsManager.getProductsPaginated(
    criteria,
    options,
    sort,
    category,
    url
  );
  res.render("products", { title: "Productos", ...result });
});

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const products = await CartsManager.getProductsInCart(cid);
  res.render("cart", {
    title: "Carrito",
    products: products.map((product) => product.toJSON()),
  });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

router.get("/chat", (req, res) => {
  res.render("chat", {});
});

export default router;

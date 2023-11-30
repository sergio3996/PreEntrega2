import { Router } from "express";
import ProductsManager from "../../dao/Products.manager.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await ProductsManager.get();
  res.status(200).json(products);
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await ProductsManager.getById(pid);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ Error: "Producto no encontrado" });
  }
});

router.post("/", async (req, res) => {
  const { body } = req;
  const product = await ProductsManager.create(body);
  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400).json(product);
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const updatedFields = req.body;
  await ProductsManager.updateById(pid, updatedFields);
  res.status(204).end();
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  await ProductsManager.deleteById(pid);
  res.status(204).end();
});

router.get("/productsPaginated/all", async (req, res) => {
  const { limit = 10, page = 1, sort, category } = req.query;
  const criteria = {};
  const options = { limit, page };
  const url = "http://localhost:8080/productsPaginated/all";
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
  res.status(200).json(result);
});

export default router;

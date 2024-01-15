import { Router } from "express";
import ProductsController from "../../controllers/products.controller.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await ProductsController.get();
  res.status(200).json(products);
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await ProductsController.getById(pid);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ Error: "Producto no encontrado" });
  }
});

router.post("/", async (req, res) => {
  const { body } = req;
  const product = await ProductsController.create(body);
  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400).json(product);
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const updatedFields = req.body;
  await ProductsController.updateById(pid, updatedFields);
  res.status(204).end();
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  await ProductsController.deleteById(pid);
  res.status(204).end();
});

router.get("/productsPaginated/all", async (req, res) => {
  const { limit = 10, page = 1, sort, category, status } = req.query;
  const criteria = {};
  const options = { limit, page };
  const url = "http://localhost:8080/api/products/productsPaginated/all";

  if (
    isNaN(pageNumber) ||
    isNaN(limitNumber) ||
    pageNumber < 1 ||
    limitNumber < 1
  ) {
    return res.status(400).json({ error: "Parametros de busqueda invalidos." });
  }

  if (sort) {
    options.sort = { price: sort };
  }
  if (category) {
    criteria.category = category;
  }
  if (status) {
    if (status === "false" || status === "true") {
      let statusQuery;
      if (status === "true") {
        statusQuery = true;
      } else {
        statusQuery = false;
      }
      criteria.status = statusQuery;
    } else {
      return res
        .status(400)
        .json({ error: "Parametros de busqueda invalidos." });
    }
  }
  const result = await ProductsController.getProductsPaginated(
    criteria,
    options,
    sort,
    category,
    status,
    url
  );

  if (pageNumber < 1 || pageNumber > result.totalPages) {
    return res.status(400).json({ error: "Esta pagina no existe!" });
  }

  res.status(200).json(result);
});

export default router;

import { Router } from "express";
import ProductsManager from "../../dao/Products.manager.js";

// import ProductManager from "../../dao/ProductManagerFS.js";

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

export default router;

// const ProductManagerInstance = new ProductManager();

// router.get("/", (req, res) => {
//   const products = ProductManagerInstance.getProducts();
//   let limit = req.query.limit;
//   if (limit) {
//     let productsLimited = products.slice(0, parseInt(limit));
//     res.status(200).json(productsLimited);
//   } else {
//     res.status(200).json(products);
//   }
// });

// router.get("/:pid", async (req, res) => {
//   try {
//     const product = await ProductManagerInstance.getProductById(req.params.pid);
//     if (product) {
//       res.status(200).json(product);
//     } else {
//       res.status(404).json({ Error: "Ese producto no existe" });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

// router.post("/", (req, res) => {
//   ProductManagerInstance.addProduct(req.body);
//   res.status(201).send("Producto creado");
// });

// router.put("/:pid", (req, res) => {
//   const updatedFields = req.body;
//   ProductManagerInstance.updateProduct(req.params.pid, updatedFields);
// });

// router.delete("/:pid", (req, res) => {
//   ProductManagerInstance.deleteProduct(req.params.pid);
// });

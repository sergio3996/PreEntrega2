const { Router } = require("express");
const ProductManager = require("../ProductManager");

const router = Router();
const ProductManagerInstance = new ProductManager();

router.get("/", (req, res) => {
  const products = ProductManagerInstance.getProducts();
  let limit = req.query.limit;
  if (limit) {
    let productsLimited = products.slice(0, parseInt(limit));
    res.status(200).json(productsLimited);
  } else {
    res.status(200).json(products);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const product = await ProductManagerInstance.getProductById(req.params.pid);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ Error: "Ese producto no existe" });
    }
  } catch (error) {
    console.error(error);
  }
});

router.post("/", (req, res) => {
  const {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category,
  } = req.body;
  ProductManagerInstance.addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category
  );
});

router.put("/:pid", (req, res) => {
  const updatedFields = req.body;
  ProductManagerInstance.updateProduct(req.params.pid, updatedFields);
});

router.delete("/:pid", (req, res) => {
  ProductManagerInstance.deleteProduct(req.params.pid);
});

module.exports = router;

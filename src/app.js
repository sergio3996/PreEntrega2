const express = require("express");
const ProductManager = require("./ProductManager.js");
const app = express();

const port = 8080;

const ProductManagerInstance = new ProductManager();

app.listen(port, () => {
  console.log(`escuchando en el puerto ${port}`);
});

app.get("/products", (req, res) => {
  const products = ProductManagerInstance.getProducts();
  let limit = req.query.limit;
  if (limit) {
    let productsLimited = products.slice(0, parseInt(limit));
    res.status(200).json(productsLimited);
  } else {
    res.status(200).json(products);
  }
});

app.get("/products/:pid", async (req, res) => {
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

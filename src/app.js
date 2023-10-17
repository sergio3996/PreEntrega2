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
    res.send(productsLimited);
  } else {
    res.send(products);
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const product = await ProductManagerInstance.getProductById(req.params.pid);
    res.send(product);
  } catch (error) {
    console.error(error);
  }
});

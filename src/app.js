const express = require("express");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;

app.listen(port, () => {
  console.log(`escuchando en el puerto ${port}`);
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

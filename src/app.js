import express from "express";
import handlebars from "express-handlebars";
import apiProductsRouter from "./routes/api/products.router.js";
import apiCartsRouter from "./routes/api/carts.router.js";
import { __dirname } from "./utils.js";
import viewsRouter from "./routes/views/views.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//Middleware de control de errores
app.use((error, req, res, next) => {
  const message = `Ha ocurrido un error desconocido: ${error.message}`;
  console.error(message);
  res.status(500).json({ message });
});

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", apiProductsRouter);
app.use("/api/carts", apiCartsRouter);

export default app;

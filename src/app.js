import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import ProductManager from "./ProductManager.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Httpserver = app.listen(8080, () =>
  console.log("Escuchando al puerto 8080")
);

const socketServer = new Server(Httpserver);

app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");

app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const ProductManagerInstance = new ProductManager();
socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.emit("products", ProductManagerInstance.getProducts());
});

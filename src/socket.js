import { Server } from "socket.io";
import ProductsController from "./controllers/products.controller.js";
import MessagesController from "./controllers/messages.controller.js";

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer);

  io.on("connection", async (socketClient) => {
    console.log("Nuevo cliente conectado");

    socketClient.emit("products", await ProductsController.get());

    socketClient.on("new-product", async (newProduct) => {
      try {
        await ProductsController.create(newProduct);
        const products = await ProductsController.get();
        io.emit("products", products);
      } catch (error) {
        console.error(error);
      }
    });

    socketClient.on("delete-product", async (productId) => {
      try {
        await ProductsController.deleteById(productId);
        const products = await ProductsController.get();
        io.emit("products", products);
      } catch (error) {
        console.error(error);
      }
    });

    socketClient.emit("messages", await MessagesController.get());

    socketClient.on("new-message", async (newMessage) => {
      await MessagesController.add(newMessage);
      io.emit("messages", await MessagesController.get());
    });
  });
};

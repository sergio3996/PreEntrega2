import { Server } from "socket.io";
import { getMessages, newMessage } from "./controllers/message.controller.js";
import ProductService from "./services/product.service.js";
import { ConversationListInstance } from "twilio/lib/rest/conversations/v1/conversation.js";

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer);

  io.on("connection", async (socketClient) => {
    console.log("Nuevo cliente conectado");

    socketClient.emit("products", await ProductService.get());

    socketClient.on("new-product", async (newProduct) => {
      try {
        await ProductService.create(newProduct);
        const products = await ProductService.get();
        io.emit("products", products);
      } catch (error) {
        console.error(error);
      }
    });

    socketClient.on("delete-product", async (data) => {
      console.log(data);
      const { productId, userData } = data;
      try {
        await ProductService.deleteById(productId, userData);
        const products = await ProductService.get();
        io.emit("products", products);
      } catch (error) {
        console.error(error);
      }
    });

    socketClient.emit("messages", await getMessages());

    socketClient.on("new-message", async (data) => {
      await newMessage(data);
      io.emit("messages", await getMessages());
    });
  });
};

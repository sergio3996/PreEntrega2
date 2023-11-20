import { Server } from "socket.io";
import ProductsManager from "./dao/Products.manager.js";
import MessagesManager from "./dao/Messages.manager.js";
// import ProductManager from "./dao/ProductManagerFS";

let io;
// const ProductManagerInstance = new ProductManager();

export const initSocket = (httpServer) => {
  io = new Server(httpServer);

  io.on("connection", async (socketClient) => {
    console.log("Nuevo cliente conectado");

    socketClient.emit("products", await ProductsManager.get());

    socketClient.on("new-product", async (newProduct) => {
      try {
        await ProductsManager.create(newProduct);
        const products = await ProductsManager.get();
        io.emit("products", products);
      } catch (error) {
        console.error(error);
      }
    });

    socketClient.on("delete-product", async (productId) => {
      try {
        await ProductsManager.deleteById(productId);
        const products = await ProductsManager.get();
        io.emit("products", products);
      } catch (error) {
        console.error(error);
      }
    });

    socketClient.emit("messages", await MessagesManager.get());

    socketClient.on("new-message", async (newMessage) => {
      await MessagesManager.add(newMessage);
      io.emit("messages", await MessagesManager.get());
    });
  });
};

// export const initSocket = (httpServer) => {
//   io = new Server(httpServer);

//   io.on("connection", (socketClient) => {
//     console.log("Nuevo cliente conectado");

//     socketClient.emit("products", ProductManagerInstance.getProducts());

//     socketClient.on("new-product", async (newProduct) => {
//       try {
//         await ProductManagerInstance.addProduct(newProduct);
//         io.emit("products", ProductManagerInstance.getProducts());
//       } catch (error) {
//         console.error(error);
//       }
//     });

//     socketClient.on("delete-product", async (productId) => {
//       try {
//         await ProductManagerInstance.deleteProduct(productId);
//         io.emit("products", ProductManagerInstance.getProducts());
//       } catch (error) {
//         console.error(error);
//       }
//     });
//   });
// };

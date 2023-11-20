import http from "http";
import app from "./app.js";
import { init } from "./db/mongodb.js";
import { initSocket } from "./socket.js";

await init();

const server = http.createServer(app);
const PORT = 8080;

initSocket(server);

server.listen(PORT, () => {
  console.log(`Escuchando al PUERTO ${PORT}`);
});

import express from "express";
import handlebars from "express-handlebars";
import apiUsersRouter from "./routes/api/user.router.js";
import apiAuthRouter from "./routes/api/auth.router.js";
import apiCartRouter from "./routes/api/cart.router.js";
import apiProductRouter from "./routes/api/product.router.js";
import apiEmailRouter from "./routes/api/email.router.js";
import viewsRouter from "./routes/views/views.router.js";
import { __dirname } from "./utils.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

//Middleware de control de errores
app.use((error, req, res, next) => {
  const message = `Ha ocurrido un error desconocido: ${error.message}`;
  console.error(message);
  res.status(500).json({ message });
});

app.use("/api/users", apiUsersRouter);
app.use("/api/auth", apiAuthRouter);
app.use("/api/carts", apiCartRouter);
app.use("/api/products", apiProductRouter);
app.use("/api/email", apiEmailRouter);
app.use("/", viewsRouter);

export default app;

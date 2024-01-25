import { Router } from "express";
import { authorization, passportCall } from "../../utils.js";
import ProductService from "../../services/product.service.js";
import CartService from "../../services/cart.service.js";

const router = Router();

router.get("/products", passportCall("jwt"), async (req, res) => {
  const { limit = 10, page = 1, sort, category, status } = req.query;
  const url = "http://localhost:8080/products";
  try {
    const result = await ProductService.getProductsPaginated(
      limit,
      page,
      sort,
      category,
      status,
      url
    );
    res.render("products", {
      title: "Productos",
      ...result,
      user: req.user,
    });
  } catch (error) {
    res.render("error", {
      title: "Error!",
      messageError: error.message,
      page: "/products",
    });
  }
});

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const products = await CartService.getCartProducts(cid);
    res.render("cart", {
      title: "Carrito",
      products: products.map((product) => product.toJSON()),
    });
  } catch (error) {
    res.render("error", {
      title: "Error!",
      messageError: error.message,
      page: "/products",
    });
  }
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

router.get("/", (req, res) => {
  if (!req.user) {
    return res.render("login", { title: "Login" });
  }
  res.redirect("/products");
});

router.get("/register", (req, res) => {
  if (!req.user) {
    res.render("register", { title: "Registro" });
  } else {
    res.redirect("/products");
  }
});

router.get("/profile", passportCall("jwt"), (req, res) => {
  res.render("profile", {
    title: "Perfil",
    user: req.user,
  });
});

router.get("/chat", passportCall("jwt"), authorization("user"), (req, res) => {
  res.render("chat", {});
});

export default router;

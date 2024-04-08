import { Router } from "express";
import { handlePolicies, passportCall } from "../../utils/utils.js";
import ProductService from "../../services/product.service.js";
import CartService from "../../services/cart.service.js";
import UserService from "../../services/user.service.js";

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

router.get("/cart", passportCall("jwt"), async (req, res) => {
  try {
    const products = await CartService.getCartProducts(req.user.cart);
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

router.get(
  "/realtimeproducts",
  passportCall("jwt"),
  handlePolicies(["PREMIUM", "ADMIN"]),
  (req, res) => {
    res.render("realTimeProducts", {});
  }
);

router.get("/", (req, res) => {
  if (req.cookies.token) {
    return res.redirect("/products");
  }
  res.render("login", { title: "Login" });
});

router.get("/register", (req, res) => {
  if (!req.cookies.token) {
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

router.get(
  "/chat",
  passportCall("jwt"),
  handlePolicies(["USER", "PREMIUM", "ADMIN"]),
  (req, res) => {
    res.render("chat", {});
  }
);

router.get("/forgot-password", (req, res) => {
  res.render("forgot-password", {
    title: "Recuperar contraseña",
  });
});

router.get("/reset-password/:token", (req, res) => {
  res.render("reset-password", {
    title: "Restaurar contraseña",
  });
});

router.get(
  "/admin",
  passportCall("jwt"),
  handlePolicies(["ADMIN"]),
  async (req, res) => {
    const users = await UserService.getAll();
    res.render("admin", {
      title: "Panel de administrador",
      users: users,
    });
  }
);

export default router;

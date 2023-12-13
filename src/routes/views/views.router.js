import express from "express";
import ProductsManager from "../../dao/Products.manager.js";
import CartsManager from "../../dao/Carts.manager.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  if (!req.user) {
    return res.render("error", {
      title: "Error!",
      messageError: "Debes iniciar sesion para ver los productos!",
      page: "/",
    });
  }

  const { limit = 10, page = 1, sort, category, status } = req.query;
  const criteria = {};
  const options = { limit, page };
  const url = "http://localhost:8080/products";

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  if (
    isNaN(pageNumber) ||
    isNaN(limitNumber) ||
    pageNumber < 1 ||
    limitNumber < 1
  ) {
    return res.status(400).json({ error: "Parametros de busqueda invalidos." });
  }

  if (sort) {
    options.sort = { price: sort };
  }

  if (category) {
    criteria.category = category;
  }

  if (status) {
    if (status === "false" || status === "true") {
      let statusQuery;
      if (status === "true") {
        statusQuery = true;
      } else {
        statusQuery = false;
      }
      criteria.status = statusQuery;
    } else {
      return res
        .status(400)
        .json({ error: "Parametros de busqueda invalidos." });
    }
  }

  const result = await ProductsManager.getProductsPaginated(
    criteria,
    options,
    sort,
    category,
    status,
    url
  );

  if (pageNumber < 1 || pageNumber > result.totalPages) {
    return res.status(400).json({ error: "Esta pagina no existe!" });
  }

  res.render("products", {
    title: "Productos",
    ...result,
    user: req.user._id === "adminId" ? req.user : req.user.toJSON(),
  });
});

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const products = await CartsManager.getProductsInCart(cid);
  res.render("cart", {
    title: "Carrito",
    products: products.map((product) => product.toJSON()),
  });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

router.get("/chat", (req, res) => {
  res.render("chat", {});
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

router.get("/profile", (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }
  res.render("profile", {
    title: "Perfil",
    user: req.user._id === "adminId" ? req.user : req.user.toJSON(),
  });
});

router.get("/faillogin", (req, res) => {
  res.render("error", {
    title: "Login error",
    messageError:
      "Ha habido un error al intentar iniciar sesion, revise las credenciales.",
    page: "/",
  });
});

router.get("/failregister", (req, res) => {
  res.render("error", {
    title: "Registro error",
    messageError:
      "Ha habido un error al intentar registrarse, revise las credenciales.",
    page: "/register",
  });
});

export default router;

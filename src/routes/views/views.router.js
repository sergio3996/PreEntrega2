import express from "express";
import ProductsManager from "../../dao/Products.manager.js";
import CartsManager from "../../dao/Carts.manager.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  if (!req.session.user) {
    return res.render("error", {
      title: "Error!",
      messageError: "Debes iniciar sesion para ver los productos!",
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
    user: req.session.user,
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
  if (!req.session.user) {
    res.render("login", { title: "Login" });
  } else {
    res.redirect("/products");
  }
});

router.get("/register", (req, res) => {
  if (!req.session.user) {
    res.render("register", { title: "Registro" });
  } else {
    res.redirect("/products");
  }
});

router.get("/profile", (req, res) => {
  if (!req.session.user) {
    res.redirect("/");
  } else {
    res.render("profile", { title: "Perfil", user: req.session.user });
  }
});

export default router;

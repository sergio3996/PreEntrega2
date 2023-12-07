import { Router } from "express";
import UsersManager from "../../dao/Users.manager.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("error", {
      title: "Error!",
      messageError: "Todos los campos son requeridos",
    });
  }
  if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
    req.session.user = {
      first_name: "Coder",
      last_name: "House",
      email: "adminCoder@coder.com",
      age: "&&",
      role: "admin",
    };
    res.redirect("/products");
  }
  const user = await UsersManager.getOne(email);
  if (!user) {
    return res.render("error", {
      title: "Error!",
      messageError: "Email o Contraseña invalidos",
    });
  }
  if (user.password !== password) {
    return res.render("error", {
      title: "Error!",
      messageError: "Email o Contraseña invalidos",
    });
  }

  const { first_name, last_name, age, email: userEmail } = user;

  req.session.user = { first_name, last_name, age, userEmail, role: "Usuario" };
  res.redirect("/products");
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  console.log(req.body);

  if (!first_name || !last_name || !email || !password) {
    return res.render("error", {
      title: "Error!",
      messageError: "Todos los campos excepto edad son requeridos",
    });
  }

  let newUser = {
    first_name,
    last_name,
    email,
    age,
    password,
  };

  try {
    const user = await UsersManager.create(newUser);
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "No estas autenticado" });
  }
  res.status(200).json(req.session.user);
});

export default router;

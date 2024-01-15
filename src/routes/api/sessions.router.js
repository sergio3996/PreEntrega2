import { Router } from "express";
import passport from "passport";
import {
  generateToken,
  isValidPassword,
  createHash,
  passportCall,
} from "../../utils.js";
import UsersController from "../../controllers/users.controller.js";
import config from "../../config/config.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email === config.adminEmail && password === config.adminPassword) {
    const user = {
      _id: "adminId",
      first_name: "Coder",
      last_name: "House",
      email,
      age: "&&",
      password: config.adminPassword,
      role: "admin",
    };
    const token = generateToken(user);
    return res
      .cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .redirect("/products");
  }
  const user = await UsersController.getOne(email);
  if (!user) {
    return res.render("error", {
      title: "Error!",
      messageError: "Email o Contraseña invalidos",
      page: "/",
    });
  }
  if (!isValidPassword(user, password)) {
    return res.render("error", {
      title: "Error!",
      messageError: "Email o Contraseña invalidos",
      page: "/",
    });
  }
  const token = generateToken(user);
  return res
    .cookie("token", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    })
    .redirect("/products");
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;

  if (!first_name || !last_name) {
    return res.render("error", {
      title: "Error!",
      messageError: "Todos los campos excepto edad son requerido",
      page: "/register",
    });
  }

  const user = await UsersController.getOne(email);
  if (user) {
    return res.render("error", {
      title: "Error!",
      messageError: "Ya existe un usuario con esas credenciales",
      page: "/register",
    });
  }

  let passwordHashed = createHash(password);

  let newUser = {
    first_name,
    last_name,
    email,
    age,
    password: passwordHashed,
  };

  try {
    const user = await UsersController.create(newUser);
    const token = generateToken(user);
    return res
      .cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .redirect("/products");
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/current", passportCall("jwt"), (req, res) => {
  res.status(200).json(req.user);
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { session: false, failureRedirect: "/" }),
  async (req, res) => {
    const token = generateToken(req.user);
    return res
      .cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .redirect("/products");
  }
);

export default router;

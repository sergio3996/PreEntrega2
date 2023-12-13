import { Router } from "express";
import passport from "passport";

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  (req, res) => {
    res.redirect("/products");
  }
);

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "No estas autenticado" });
  }
  res.status(200).json(req.session.user);
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.render("error", {
        title: "Error!",
        messageError: "Ocurrio un error durante el logout",
      });
    } else {
      res.redirect("/");
    }
  });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res) => {
    res.redirect("/products");
  }
);

export default router;

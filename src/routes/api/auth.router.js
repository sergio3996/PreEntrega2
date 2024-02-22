import { Router } from "express";
import {
  logout,
  login,
  current,
  forgotPassword,
  resetPassword,
} from "../../controllers/auth.controller.js";
import passport from "passport";
import { generateToken, passportCall } from "../../utils/utils.js";

const router = Router();

router.post("/", login);
router.get("/logout", logout);

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

router.get("/current", passportCall("jwt"), current);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;

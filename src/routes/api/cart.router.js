import { Router } from "express";
import {
  addToCart,
  clearCart,
  completePurchase,
  createCart,
  getCartProducts,
  getCarts,
  removeFromCart,
  updateCartItemQuantity,
} from "../../controllers/cart.controller.js";
import { handlePolicies, passportCall } from "../../utils/utils.js";

const router = Router();

router.get("/", passportCall("jwt"), handlePolicies(["ADMIN"]), getCarts);
router.post("/", createCart);
router.get(
  "/purchase",
  passportCall("jwt"),
  handlePolicies(["PREMIUM", "USER"]),
  completePurchase
);
router.get("/:cid", getCartProducts);
router.post(
  "/:cid/products/:pid",
  passportCall("jwt"),
  handlePolicies(["PREMIUM", "USER"]),
  addToCart
);
router.delete(
  "/:cid/products/:pid",
  passportCall("jwt"),
  handlePolicies(["PREMIUM", "USER"]),
  removeFromCart
);
router.delete(
  "/:cid",
  passportCall("jwt"),
  handlePolicies(["PREMIUM", "USER"]),
  clearCart
);
router.put(
  "/:cid/products/:pid",
  passportCall("jwt"),
  handlePolicies(["PREMIUM", "USER"]),
  updateCartItemQuantity
);

export default router;

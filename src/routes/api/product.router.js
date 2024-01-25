import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsPaginated,
  updateProduct,
} from "../../controllers/product.controller.js";
import { authorization, passportCall } from "../../utils.js";

const router = Router();

router.get("/", getProducts);
router.get("/productsPaginated/all", getProductsPaginated);
router.get("/:pid", getProductById);
router.post("/", passportCall("jwt"), authorization("admin"), createProduct);
router.put("/:pid", passportCall("jwt"), authorization("admin"), updateProduct);
router.delete(
  "/:pid",
  passportCall("jwt"),
  authorization("admin"),
  deleteProduct
);

export default router;

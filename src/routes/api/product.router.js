import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getMockingProducts,
  getProductById,
  getProducts,
  getProductsPaginated,
  updateProduct,
} from "../../controllers/product.controller.js";
import { authorization, passportCall } from "../../utils/utils.js";

const router = Router();

router.get("/", getProducts);
router.get("/mockingproducts", getMockingProducts);
router.get("/productsPaginated/all", getProductsPaginated);
router.get("/:pid", getProductById);
router.post("/", createProduct);
router.put("/:pid", passportCall("jwt"), authorization("admin"), updateProduct);
router.delete(
  "/:pid",
  passportCall("jwt"),
  authorization("admin"),
  deleteProduct
);

export default router;

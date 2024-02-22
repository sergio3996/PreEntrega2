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
import {
  authorization,
  handlePolicies,
  passportCall,
} from "../../utils/utils.js";

const router = Router();

router.get("/", getProducts);
router.get("/mockingproducts", handlePolicies(["PUBLIC"]), getMockingProducts);
router.get("/productsPaginated/all", getProductsPaginated);
router.get("/:pid", getProductById);
router.post("/", createProduct);
router.put(
  "/:pid",
  passportCall("jwt"),
  handlePolicies(["PREMIUM", "ADMIN"]),
  updateProduct
);
router.delete(
  "/:pid",
  passportCall("jwt"),
  handlePolicies(["PREMIUM", "ADMIN"]),
  deleteProduct
);

export default router;

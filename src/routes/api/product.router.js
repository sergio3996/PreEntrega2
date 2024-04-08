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

router.get("/", passportCall("jwt"), getProducts);
router.get("/mockingproducts", handlePolicies(["PUBLIC"]), getMockingProducts);
router.get("/productsPaginated/all", passportCall("jwt"), getProductsPaginated);
router.get("/:pid", passportCall("jwt"), getProductById);
router.post(
  "/",
  passportCall("jwt"),
  handlePolicies(["PREMIUM", "ADMIN"]),
  createProduct
);
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

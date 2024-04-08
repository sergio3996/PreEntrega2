import { Router } from "express";
import {
  changeUserRole,
  createUser,
  deleteInactiveUsers,
  deleteUser,
  getAllUsers,
} from "../../controllers/user.controller.js";
import { handlePolicies, passportCall } from "../../utils/utils.js";

const router = Router();

router.post("/", createUser);

router.get("/", passportCall("jwt"), handlePolicies(["ADMIN"]), getAllUsers);

router.get(
  "/premium/:uid",
  passportCall("jwt"),
  handlePolicies(["ADMIN"]),
  changeUserRole
);

router.delete(
  "/",
  passportCall("jwt"),
  handlePolicies(["ADMIN"]),
  deleteInactiveUsers
);

router.delete(
  "/:uid",
  passportCall("jwt"),
  handlePolicies(["ADMIN"]),
  deleteUser
);

export default router;

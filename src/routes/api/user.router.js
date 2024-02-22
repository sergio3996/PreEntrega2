import { Router } from "express";
import {
  changeUserRole,
  createUser,
} from "../../controllers/user.controller.js";

const router = Router();

router.post("/", createUser);

router.get("/premium/:uid", changeUserRole);

export default router;

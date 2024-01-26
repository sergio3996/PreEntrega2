import { Router } from "express";
import { sendEmail } from "../../controllers/email.controller.js";

const router = Router();

router.get("/", sendEmail);

export default router;

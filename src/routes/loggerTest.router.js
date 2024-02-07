import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  req.logger.fatal("Testeando logger 😁");
  req.logger.error("Testeando logger 😁");
  req.logger.warning("Testeando logger 😁");
  req.logger.info("Testeando logger 😁");
  req.logger.http("Testeando logger 😁");
  req.logger.debug("Testeando logger 😁");
  res.send("Logger Test 😎");
});

export default router;

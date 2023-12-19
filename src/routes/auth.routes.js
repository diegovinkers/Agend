import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  verifyToken
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validatorSchema } from "../middlewares/validator.middlewares.js";
import { registerSchema, loginSchema } from "../schemas/authPatient.schema.js";

const router = Router();

router.post("/register", validatorSchema(registerSchema), register);

router.post("/login", validatorSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/verify", verifyToken);

router.get("/profile", authRequired, profile);

export default router;

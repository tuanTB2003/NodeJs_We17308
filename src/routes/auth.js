import express from "express";
import { login, signup } from "../controllers/auth.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", signup);

export default router;
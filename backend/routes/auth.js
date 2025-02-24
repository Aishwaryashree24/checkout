import express from "express";
import { register, login } from "../controllers/auth.js";
import { logout } from "../controllers/auth.js";

const router = express.Router();

// User Registration
router.post("/register", register);

// User Login
router.post("/login", login);

router.post("/logout", logout);

export default router;

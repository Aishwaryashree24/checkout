import express from "express";
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/user.js";
import { verifyToken, verifyAdmin } from "../middleware/verifyToken.js";
import {getWalletBalance,addFundsToWallet} from "../controllers/user.js"

const router = express.Router();

// Update user (self only)
router.put("/:id", verifyToken, updateUser);

// Delete user (admin only)
router.delete("/:id", verifyToken,verifyAdmin, deleteUser);

// Get user details (self only)
router.get("/:id", verifyToken, getUser);

// Get all users (admin only)
router.get("/", verifyToken,verifyAdmin, getUsers);

router.get("/:id/wallet", verifyToken, getWalletBalance);

router.put("/:id/wallet", verifyToken, addFundsToWallet);


export default router;

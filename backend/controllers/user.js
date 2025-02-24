import User from "../models/User.js";
import { createError } from "../utils/error.js";

// 📌 Update User
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// 📌 Delete User
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// 📌 Get User Details
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// 📌 Get All Users (Admin Only)
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getWalletBalance = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ walletBalance: user.wallet });
  } catch (err) {
    next(err);
  }
};

export const addFundsToWallet = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.wallet += Number(req.body.amount);
    await user.save();

    res.status(200).json({ success: true, walletBalance: user.wallet });
  } catch (err) {
    next(err);
  }
};


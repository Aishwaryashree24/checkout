import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const verifyUser = (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "Access denied!" });
    }
  };
  
// 📌 Verify Hotel Owner Middleware
// verifyToken middleware: extracts token and attaches user info to req.user
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access!" });
  }
  
  jwt.verify(token, config.JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ message: token });
    }
    req.user = decodedUser; // Attach decoded user to req.user
    next();
  });
};

// verifyHotelOwner middleware: checks if the user is a hotel owner or admin


// 📌 Verify Admin Middleware
export const verifyAdmin = async(req, res, next) => {
  const token = req.cookies.access_token;
  const user = await fetch(`http://localhost:5000/api/users/${req.user.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cookie": `access_token=${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
  if (user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: "Admin access only!" });
  }
};

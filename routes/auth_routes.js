import express from "express";
import { login } from "../controllers/auth_controller.js";
import { trycatch } from "../middleware/trycatch.js";

const route = express.Router();

route.post("/login",trycatch(login));

route.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' }); 
  });

export default route;

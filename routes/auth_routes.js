import express from "express";
import { login } from "../controllers/auth_controller.js";
import { trycatch } from "../middleware/trycatch.js";

const route = express.Router();

route.post("/login",trycatch( login));

export default route;

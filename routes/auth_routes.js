import express from "express";
import { googleLogin, login } from "../controllers/auth_controller.js";
import { trycatch } from "../middleware/trycatch.js";
// import { googleLogin } from "../controllers/google_auth.js";

const route = express.Router();

route.post("/login",trycatch(login));
route.post("/google-login", trycatch(googleLogin));

route.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' }); 
  });

export default route;

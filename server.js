import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; 
import adminRoute from './routes/admin_route.js';
import authRoute from './routes/auth_routes.js';

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.DB, { dbName: "social-media" })
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => console.log("Database connection error:", err));

// Routes
app.use("/api/admin", adminRoute);
app.use("/api", authRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

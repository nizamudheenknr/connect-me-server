import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../model/admin.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const admin = await Admin.findOne({ email });
  if (admin) {
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful",
      admin,
      token,
    });
  } else {
    return res.status(404).json({ message: "Admin not found" });
  }
};

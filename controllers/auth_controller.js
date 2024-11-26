


import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { Admin } from "../model/admin.js";
import { OAuth2Client } from "google-auth-library";


import User from "../model/User.js";
import Admin from "../model/Admin.js";


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
      message: "Admin Login successful",
      user: admin, 
      token,
      role: 'admin'
    });
  }

  
  const user = await User.findOne({ email });
  if (user) {
    
    if (user.isDeleted) {
      return res.status(403).json({ message: "User is blocked by admin" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "User login successful",
      user,
      token,
      role:'user'
    });
  }
  console.error("Login attempt failed for email:", email);
  
  return res.status(404).json({ message: "User or Admin not found" });
};




const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  const { token } = req.body;


  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email, name } = ticket.getPayload();


  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email, username: name, role: "user" });
    await user.save();
  }

 
  const jwtToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({
    token: jwtToken,
    role: user.role,
    user,
  });
};


  


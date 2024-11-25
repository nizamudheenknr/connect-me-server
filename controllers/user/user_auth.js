

import bcrypt from 'bcryptjs';
import User from '../../model/User.js';

export const userRegister = async (req, res) => {
  const { username, email, password } = req.body;

 
  console.log(req.cloudinaryMediaUrl, "req.cloudinaryMediaUrl from register API");

  
  const profileImageUrl = req.cloudinaryMediaUrl || '';  

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already registered with this email." });
  }

 
  const hash = await bcrypt.hash(password, 10);

  
  const newUser = new User({
    username,
    email,
    password: hash,
    profileImage: profileImageUrl, 
  });

  try {
    
    await newUser.save();
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        profileImage: newUser.profileImage,
      },
    });
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

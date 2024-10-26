
import bcrypt from 'bcryptjs'
import { Admin } from '../../model/admin.js';

export const create_admin = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "require all field" });
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return res.status(409).json({ message: "Admin already take this email" });
  }

  const hash = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({
    username,
    email,
    password: hash,
  });
  await newAdmin.save();
  return res
    .status(201)
    .json({ message: "Admin created succussfully", Admin: newAdmin });
};

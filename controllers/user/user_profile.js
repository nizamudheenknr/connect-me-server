import User from "../../model/User.js";

export const getUserProfile = async (req, res) => {
  const { id } = req.params;  

  const user = await User.findById(id, "-password").populate("posts"); 
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);  
};



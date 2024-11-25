import Post from "../../model/post.js";
import User from "../../model/User.js";

export const uploadPost = async (req, res) => {
  console.log("API reached!"); 
  const { userId } = req.params;
  const { caption } = req.body; 
  console.log("User ID:", userId);

  try {
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

   
    if (!req.cloudinaryMediaUrl) {
      return res
        .status(400)
        .json({ error: "No media uploaded. Please upload an image or video." });
    }

    
    const newPost = new Post({
      media: req.cloudinaryMediaUrl, 
      caption,
      userId,
      mediaType:req.file.mimetype.slice(0,5)
    });
    console.log("vfsvsd",req.file.mimetype);
    

    const savedPost = await newPost.save();

    
    user.posts.push(savedPost._id);
    await user.save();

    return res.status(201).json({
      message: "Post uploaded successfully",
      post: savedPost,
    });
  } catch (error) {
    console.error("Error uploading post:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

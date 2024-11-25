import mongoose from "mongoose";
import Post from './post.js'
const userSchema = new mongoose.Schema(
  {
    username: {
       type: String,
        required: true 
        
      },
    email: { 
      type: String,
       required: true,
        unique: true 
      },
    password: { 
      type: String, 
      required: true
     },
     role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user' 
   },
    profileImage: { 
      type: String, 
      default: "" 
    },
    followers: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }],
    following: [{
       type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
      }],
    posts:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
      

    likedPosts: [{
       type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
       }],
    isDeleted: { 
        type: Boolean, 
        default: false 
      },
    createdAt: {
       type: Date,
       default: Date.now 
      }, 
      is_active:{
        type:Boolean,
        default:true
      }, 
      isBlocked: {
         type: Boolean, 
         default: false
         },
         friends: {
          type: [String], 
          default: [],
        }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

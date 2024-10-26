import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "", // URL for profile picture
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    chats: [
      {
        friendId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        messages: [
          {
            sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            text: String,
            timestamp: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    ],
    videoCalls: [
      {
        friendId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        callTimestamp: {
          type: Date,
          default: Date.now,
        },
        callDuration: Number, // Duration in seconds
      },
    ],
    searchHistory: [
      {
        query: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    mentions: [
      {
        postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    tags: [
      {
        postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    sharedPosts: [
      {
        postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

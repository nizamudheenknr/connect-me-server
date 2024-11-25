import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
  // media: { 
  //   type: String 
  //   },
    mediaType: {
      type: String
      // enum: ['image', 'video'], 
      // required: true,
    },
  media: { 
    type: String, 
    required: true 
  },
  
    createdAt: {
      type: Date,
      default: Date.now,
    },
    caption: {
      type: String,
      default: '',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, 
    },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    comments: [
      {
        username: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  });
  
  const Post = mongoose.model('Post', postSchema);
  
  export default Post;
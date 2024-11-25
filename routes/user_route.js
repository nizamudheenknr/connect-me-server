// import express from 'express';
// import {userRegister } from '../controllers/user/user_auth.js';
// import { trycatch } from '../middleware/trycatch.js';
// // import { cloudinaryUploadImg } from '../middleware/multer.js';
// import { getUserProfile } from '../controllers/user/user_profile.js';
// import validate from '../middleware/validate.js';
// import uservalidate from '../validation/uservalidate.js';
// import { uploadPost } from '../controllers/user/user_postupl.js';
// import {  uploadMedia } from '../middleware/multer.js';


// const router = express.Router();


// router.post('/register',uploadMedia.single("media"),trycatch(userRegister));
// router.get('/:id',trycatch(getUserProfile));
// // router.get('/upload/:id',imageUpload,videoUpload,trycatch(uploadPost));
// // router.post('/upload/:id', imageUpload.single('image'), videoUpload.single('video'), trycatch(uploadPost));
// // router.post("/upload/:id",uploadMedia, trycatch(uploadPost));
// router.post("/upload/:userId", uploadMedia.single("media"), uploadPost);


// export default router;


import express from 'express';
import { userRegister } from '../controllers/user/user_auth.js';
import { trycatch } from '../middleware/trycatch.js';
import { getUserProfile } from '../controllers/user/user_profile.js';
import { uploadPost } from '../controllers/user/user_postupl.js';
import { cloudinaryUploadImg } from '../middleware/multer.js';

const router = express.Router();


router.post('/register', cloudinaryUploadImg, trycatch(userRegister));


router.get('/:id', trycatch(getUserProfile));


router.post("/upload/:userId", cloudinaryUploadImg, trycatch(uploadPost));

export default router;

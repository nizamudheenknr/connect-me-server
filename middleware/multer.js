
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || 'dlcodlaht',
  api_key: process.env.API_KEY || '173425262689178',
  api_secret: process.env.API_SECRET || '9P4MCmknnj-X2lUxjJvHeJ32Xoo',
});


const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});


const upload = multer({
  storage,
  limits: { fileSize: 800000000 },  
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
      cb(null, true); 
    } else {
      cb(new Error('Invalid file type. Only images and videos are allowed.'));
    }
  },
});
  




export const cloudinaryUploadImg = (req, res, next) => {
  upload.single('media')(req, res, async (error) => {
    if (error) {
      console.error('Multer upload error:', error);
      return res.status(400).json({ error: error.message });
    }

    if (!req.file) {
      console.error('No file provided for upload.');
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    try {
      const resourceType = req.file.mimetype.startsWith('video') ? 'video' : 'image';
      console.log('Resourcetype : ', resourceType);

      
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: resourceType },
        (err, result) => {
          if (err) {
            console.error('Cloudinary upload error:', err);
            return res.status(500).json({ error: 'Error uploading to Cloudinary' });
          }

          
          req.cloudinaryMediaUrl = result.secure_url;
          console.log('Cloudinary upload result:', result);

          
          next();
        }
      );

      
      fs.createReadStream(req.file.path).pipe(stream);
    } catch (err) {
      console.error('Cloudinary error:', err);
      return res.status(500).json({ error: err.message || 'Error uploading to Cloudinary.' });
    }
  });
};

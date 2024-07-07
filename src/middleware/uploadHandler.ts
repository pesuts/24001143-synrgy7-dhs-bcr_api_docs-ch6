import multer from "multer";
import path from "path";
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';

import { v2 as cloudinary } from "cloudinary";

import { resolve } from 'path';
dotenv.config();

// const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
// dotenv.config({ path: resolve(__dirname, `../${envFile}`) });

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
})

const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//   destination: (req: Request, file: Express.Multer.File, cb) => {
//     cb(null, UPLOAD_DIR);
//   },
//   filename: (req: Request, file: Express.Multer.File, cb) => {
//     const id = nanoid(16);
//     cb(null, id + path.extname(file.originalname));
//   },
// });

const imageFilter = function (
  req: Request,
  // res: Response,
  file: Express.Multer.File,
  cb: any
) {
  if (!file) {
    return cb(null, true);
  }
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    const error = new Error("Only image files are allowed!");
    error.name = "FileTypeError";
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter: imageFilter });

const handleUploadErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  } else if (err.name === "FileTypeError") {
    return res.status(400).json({ message: err.message });
  }
  next(err);
};

export default upload;
export { handleUploadErrors };

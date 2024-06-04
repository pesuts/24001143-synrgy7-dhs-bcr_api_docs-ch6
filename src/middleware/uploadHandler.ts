import multer from "multer";
import path from "path";
import { Request, Response } from "express";
import { nanoid } from "nanoid";

const PUBLIC_DIR = path.join(__dirname, "../public");
const UPLOAD_DIR = path.join(PUBLIC_DIR, "uploads");

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const id = nanoid(16);
    cb(null, id + path.extname(file.originalname));
  },
});

const imageFilter = function (
  req: Request,
  file: Express.Multer.File,
  cb: any
) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(null, false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter: imageFilter });

export default upload;

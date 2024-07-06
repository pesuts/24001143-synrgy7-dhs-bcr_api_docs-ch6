import multer from "multer";
import path from "path";
import { Request, Response, NextFunction } from "express";
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
  // res: Response,
  file: Express.Multer.File,
  cb: any
) {
  if (!file) {
    return cb(null, true);
  }
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    // return cb(null, false);
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
    // Kesalahan dari multer
    return res.status(400).json({ message: err.message });
  } else if (err.name === "FileTypeError") {
    // Kesalahan jenis file
    return res.status(400).json({ message: err.message });
  }
  // Kesalahan lain
  next(err);
};

export default upload;
export { handleUploadErrors };

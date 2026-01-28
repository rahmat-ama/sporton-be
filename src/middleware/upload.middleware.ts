import multer from "multer";
import path from "path";
import fs from "fs";
import { error } from "console";

const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, calllback) => {
    calllback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callback(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith("image/")) {
    callback(null, true);
  } else {
    callback(new Error("Only images are allowed"));
  }
};

export const uplaod = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: (5 * 1024) & 1024 },
});

import upload from "./multer";
import { Request, Response, NextFunction } from "express";

export const uploadImage = (req: Request, res: Response) => {
  return new Promise((resolve, reject) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        reject(err);
        return;
      }

      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        resolve(null);
        return;
      }

      resolve(req.file);
    });
  });
};

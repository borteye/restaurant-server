import upload from "./multer";
import { Request, Response } from "express";

export const uploadImage = (req: Request, res: Response) => {
  console.log("check:", req.file);
  return new Promise((resolve, reject) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        reject(err);
        return;
      }

      const uploadedFile = req.file;

      if (!uploadedFile) {
        res.status(400).json({ error: "No file uploaded" });
        resolve(null);
        return;
      }

      res.status(200).json({
        message: "File uploaded successfully",
        file: uploadedFile,
      });

      resolve(uploadedFile);
    });
  });
};

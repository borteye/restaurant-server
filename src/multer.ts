import multer from "multer";
import cloudinary from "./cloudinaryConfig";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "test_dev",
    allowedFormats: ["jpg", "png", "gif", "jpeg"],
  } as any,
});

const upload = multer({ storage });
console.log(upload);

export default upload;

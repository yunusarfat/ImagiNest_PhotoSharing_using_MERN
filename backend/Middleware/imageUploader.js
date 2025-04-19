const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "glallaries",
    format: async (req, file) => undefined, // supports every image format
    public_id: (req, file) => file.originalname.split(".")[0] + "",
  },
});
const cloudinaryFileUploader = multer({ storage });
const uploadMultiple = cloudinaryFileUploader.array("images", 10);
module.exports = { uploadMultiple };

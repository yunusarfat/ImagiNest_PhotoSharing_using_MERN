const { uploadMultiple } = require("../Middleware/imageUploader");
const imageModel = require("../Models/imageModel");
const Routes = require("express").Router();
Routes.get("/", async (req, res) => {
  try {
    const data = await imageModel.find();
    res.status(200).json({
      message: "All images shown successfully",
      data: data,
      success: true,
    });
  } catch (err) {
    res.status(200).json({
      message: "file upload failed",
      err: err,
      success: false,
    });
  }
});
Routes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await imageModel.findOne({ _id: id });
    res.status(200).json({
      message: "image shown successfully",
      data: data,
      success: true,
    });
  } catch (err) {
    res.status(200).json({
      message: "file upload failed",
      err: err,
      success: false,
    });
  }
});

Routes.post("/upload-images", uploadMultiple, async (req, res) => {
  console.log("upload public url---->", req.files);
  try {
    const images = req.files.map((file) => ({
      mimetype: file.mimetype,
      originalName: file.originalname,
      size: file.size.toString(),
      imageURL: file.path,
    }));
    await imageModel.insertMany(images);
    res.status(200).json({
      message: "file upload successfully",
      data: req.files,
      success: true,
    });
  } catch (err) {
    res.status(200).json({
      message: "file upload failed",
      err: err,
      success: false,
    });
  }
});
module.exports = Routes;

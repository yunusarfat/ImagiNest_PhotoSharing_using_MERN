const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ImageSchema = new schema({
  imageURL: {
    type: String,
  },
  originalName: {
    type: String,
  },
  size: {
    type: String,
  },
  mimetype: {
    type: String,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});
const ImageModel=mongoose.model("gallaries",ImageSchema);
module.exports=ImageModel;
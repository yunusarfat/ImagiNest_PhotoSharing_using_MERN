const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const ImageRoutes=require("./Routes/imageRouter");
require("./Models/db");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
    res.send("images gallery server is running");
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/api/images", ImageRoutes);
app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const upload = multer();
const courseRouter = require("./routes/courses");
const submissionRouter = require("./routes/submissions");

mongoose.connect("mongodb://127.0.0.1:27017/edublocks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Mongoose Connected Woohoo!");
});

// app.use(upload.any());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/courses", courseRouter);
app.use("/submissions", submissionRouter);

const PORT = process.env.PORT || "4000";

app.listen(PORT, () => {
  console.log("Server up and running on port:", PORT);
});

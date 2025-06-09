require("dotenv").config();
const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");

const app = express();
const port = 3000;

app.use("/user", userRouter);
app.use("/course", courseRouter);

app.post("/admin/signup", function (req, res) {});
app.post("/admin/login", function (req, res) {});
app.post("/admin/create-course", function (req, res) {});
app.post("/admin/add-course-content", function (req, res) {});
app.delete("/admin/delete-course", function (req, res) {});

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});

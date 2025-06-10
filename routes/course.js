const { Router } = require("express");
const { userAuthMiddleware } = require("../middlewares/user");
const { purchaseModel, courseModel } = require("../db");

const courseRouter = Router();

courseRouter.post("/purchase", userAuthMiddleware, async function (req, res) {
  const userId = req.userid;
  const courseId = req.body.courseId;

  await purchaseModel.create({
    userId,
    courseId,
  });
  res.json({
    message: "Purchase successful",
  });
});

courseRouter.get("/all-courses", async function (req, res) {
  const courses = await courseModel.find({});

  res.json({
    message: "All courses",
    courses,
  });
});

module.exports = {
  courseRouter: courseRouter,
};

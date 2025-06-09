const { Router } = require("express");

const courseRouter = Router();

courseRouter.post("/purchase", function (req, res) {});
courseRouter.get("/all-courses", function (req, res) {});

module.exports = {
  courseRouter: courseRouter,
};

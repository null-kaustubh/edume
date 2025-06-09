const { Router } = require("express");
const { adminModel } = require("../db");
const adminRouter = Router();

adminRouter.post("/signup", function (req, res) {});
adminRouter.post("/login", function (req, res) {});

// adminRouter.use(auth);

adminRouter.post("/course", function (req, res) {});
adminRouter.patch("/course", function (req, res) {});
adminRouter.delete("/course", function (req, res) {});

module.exports = {
  adminRouter: adminRouter,
};

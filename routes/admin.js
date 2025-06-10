const { Router } = require("express");
const { adminModel } = require("../db");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET_ADMIN;

adminRouter.post("/signup", async function (req, res) {
  const requiredBody = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(20)
      .regex(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#]).*$/),
    firstName: z.string(),
    lastName: z.string(),
  });

  const parsedData = await requiredBody.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      error: parsedData.error,
    });
    return;
  }

  const validatedData = parsedData.data;
  try {
    const hashedPass = await bcrypt.hash(validatedData.password, 7);
    await adminModel.create({
      email: validatedData.email,
      password: hashedPass,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
    });
    res.json({
      message: "You are signed up, please login",
    });
  } catch (e) {
    res.json({
      message: e,
    });
  }
});

adminRouter.post("/login", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const admin = await adminModel.findOne({
    email: email,
  });

  if (!admin) {
    res.status(403).json({
      message: "User does not exist",
    });
    return;
  }

  const passwordCheck = await bcrypt.compare(password, admin.password);

  if (passwordCheck) {
    const token = jwt.sign(
      {
        id: admin._id.toString(),
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

adminRouter.use(function (req, res, next) {
  const token = req.headers.authorization;
  const decodedData = jwt.verify(token, JWT_SECRET);

  if (decodedData) {
    req.creatorId = decodedData.id;
    next();
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

adminRouter.post("/course", function (req, res) {});
adminRouter.patch("/course", function (req, res) {});
adminRouter.delete("/course", function (req, res) {});

module.exports = {
  adminRouter: adminRouter,
};

const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminRouter = Router();
const { JWT_ADMIN_SECRET } = require("../config");
const { adminAuthMiddleware } = require("../middlewares/admin");

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
      JWT_ADMIN_SECRET
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

adminRouter.post("/course", adminAuthMiddleware, async function (req, res) {
  const adminId = req.adminId;
  const requiredBody = z.object({
    title: z.string().max(30),
    description: z.string(),
    price: z.number(),
    imageUrl: z.string(),
  });
  const parsedData = requiredBody.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      error: parsedData.error,
    });
    return;
  }

  const validatedData = parsedData.data;
  try {
    const course = await courseModel.create({
      title: validatedData.title,
      description: validatedData.description,
      price: validatedData.price,
      imageUrl: validatedData.imageUrl,
      creatorId: adminId,
    });

    res.json({
      message: "Course created",
      courseId: course._id,
    });
  } catch (e) {
    res.status(403).json({
      error: e,
    });
  }
});

adminRouter.patch("/course", adminAuthMiddleware, async function (req, res) {
  const adminId = req.adminId;

  const requiredBody = z.object({
    title: z.string().max(30).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    imageUrl: z.string().optional(),
    courseId: z.string(),
  });
  const parsedData = requiredBody.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      error: parsedData.error,
    });
    return;
  }

  const validatedData = parsedData.data;
  try {
    await courseModel.updateOne(
      {
        _id: validatedData.courseId,
        creatorId: adminId,
      },
      {
        title: validatedData.title,
        description: validatedData.description,
        price: validatedData.price,
        imageUrl: validatedData.imageUrl,
      }
    );
    res.json({
      message: "Course Updated",
    });
  } catch (e) {
    res.status(403).json({
      error: e,
    });
  }
});

adminRouter.get("/all-courses", adminAuthMiddleware, async function (req, res) {
  const adminId = req.adminId;

  try {
    const courses = await courseModel.find({
      creatorId: adminId,
    });

    res.json({
      message: "Fetched all courses",
      courses,
    });
  } catch (e) {
    res.status(403).json({
      error: e,
    });
  }
});

module.exports = {
  adminRouter: adminRouter,
};

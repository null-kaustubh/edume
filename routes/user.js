const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_USER_SECRET } = require("../config");
const { userAuthMiddleware } = require("../middlewares/user");

const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
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
    await userModel.create({
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

userRouter.post("/login", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await userModel.findOne({
    email: email,
  });

  if (!user) {
    res.status(403).json({
      message: "User does not exist",
    });
    return;
  }

  const passwordCheck = await bcrypt.compare(password, user.password);

  if (passwordCheck) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_USER_SECRET
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

userRouter.get("/purchases", userAuthMiddleware, async function (req, res) {
  const userId = req.userId;

  const purchases = await purchaseModel.find({
    userId,
  });

  const courseData = await courseModel.find({
    _id: { $in: purchases.map((x) => x.courseId) },
  });

  res.json({
    message: "Purchased courses",
    purchases,
    courseData,
  });
});

module.exports = {
  userRouter: userRouter,
};

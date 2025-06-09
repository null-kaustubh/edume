require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_CONNECT_URL);
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const User = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const Admin = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const Course = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
});

const Purchase = new Schema({
  courseId: ObjectId,
  userId: ObjectId,
});

const userModel = mongoose.model("users", User);
const adminModel = mongoose.model("admins", Admin);
const courseModel = mongoose.model("courses", Course);
const purchaseModel = mongoose.model("purchases", Purchase);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};

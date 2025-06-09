require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { z } = require("zod");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/user-signup", function (req, res) {});
app.post("/user-login", function (req, res) {});

function auth(req, res, next) {}

app.get("/user-all-courses", function (req, res) {});
app.post("/user-purchase/:id", function (req, res) {});
app.get("/user-courses", function (req, res) {});

app.post("/admin-signup", function (req, res) {});
app.post("/admin-login", function (req, res) {});
app.post("/admin-create-a-course", function (req, res) {});
app.post("/admin-add-course-content", function (req, res) {});
app.delete("/admin-delete-a-course", function (req, res) {});

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});

const jwt = require("jsonwebtoken");

const { JWT_ADMIN_SECRET } = require("../config");

function adminAuthMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const decodedData = jwt.verify(token, JWT_ADMIN_SECRET);

  if (decodedData) {
    req.adminId = decodedData.id;
    next();
  } else {
    res.status(403).json({
      message: "You are not signed in",
    });
  }
}

module.exports = {
  adminAuthMiddleware: adminAuthMiddleware,
};

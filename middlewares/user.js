const jwt = require("jsonwebtoken");

const { JWT_USER_SECRET } = require("../config");

function userAuthMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const decodedData = jwt.verify(token, JWT_USER_SECRET);

  if (decodedData) {
    req.userID = decodedData.id;
    next();
  } else {
    res.status(403).json({
      message: "You are not signed in",
    });
  }
}

module.exports = {
  userAuthMiddleware: userAuthMiddleware,
};

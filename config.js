const JWT_USER_SECRET = process.env.JWT_SECRET_USER;
const JWT_ADMIN_SECRET = process.env.JWT_SECRET_ADMIN;

module.exports = {
  JWT_ADMIN_SECRET,
  JWT_USER_SECRET,
};

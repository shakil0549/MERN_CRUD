const { body, param } = require("express-validator");
const jwt = require("jsonwebtoken");
exports.createUserValidation = [
  body("name").notEmpty().withMessage("Username is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .notEmpty()
    .withMessage("Password is required"),
];

exports.updateUserValidation = [
  param("id").isMongoId().withMessage("Invalid user ID"),
  body("name").notEmpty().withMessage("Username is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .notEmpty()
    .withMessage("Email is required"),
  // body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').notEmpty().withMessage('Password is required'),
];

exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Verifying token:", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

exports.loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

/* exports.tokenValidation = [
    body('token').notEmpty().withMessage('Token is required').custom((value) => {
        try {
            jwt.verify(value, process.env.JWT_ACCESS_SECRET);
            return true;
        } catch (err) {
            throw new Error('Invalid token');
        }
    }),
];
exports.refreshTokenValidation = [
    body('refreshToken').notEmpty().withMessage('Refresh token is required').custom((value) => {
        try {
            jwt.verify(value, process.env.JWT_REFRESH_SECRET);
            return true;
        } catch (err) {
            throw new Error('Invalid refresh token');
        }
    }),
]; */

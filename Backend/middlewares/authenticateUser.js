const JWT = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
  const token = (req.cookies && req.cookies.token) || null;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);

    req.user = { id: payload._id, email: payload.email };
  }
   catch (e) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }

  next();
};

module.exports = jwtAuth;

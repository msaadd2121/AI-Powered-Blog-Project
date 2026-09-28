const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.json({ success: false, message: "Invalid Token" });
  }
}

module.exports={
    auth,
}
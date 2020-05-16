const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  // const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access denied");
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: verified._id };
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

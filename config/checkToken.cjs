// config/checkToken.js

const jwt = require('jsonwebtoken');

const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

const checkToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(FORBIDDEN).json("No token provided");
  }

  jwt.verify(token, process.env.SECRET, async (error, data) => {
    if (error) {
      return res.status(FORBIDDEN).json("Token is invalid");
    }

    req.userId = data._id;
    next();
  });
};

module.exports = checkToken;
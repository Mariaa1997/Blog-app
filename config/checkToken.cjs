// config/checkToken.js

const jwt = require('jsonwebtoken');


const checkToken = (req,res,next) => {
  const token = req.cookies.token
  if(!token) {
    return res.status(401).json("You are not authorized")
  }
  jwt.verify(token,process.env.SECRET, async (error, data) => {
    if(error){
      return res.status(403).json("Token is invalid")
    }
    req.userId = data._id

    next()
  })
}

module.exports = checkToken
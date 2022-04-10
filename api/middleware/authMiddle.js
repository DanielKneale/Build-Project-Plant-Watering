const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../../config")

const restricted = (req,res,next)=>{
    const token = req.headers.authorization
 
    if(!token){
      res.status(401).json("token required")
    }else{
      jwt.verify(token,JWT_SECRET,(err,decoded)=>{
        if(err){
          res.status(404).json("i dont think you have your token")
        }else{
          req.decodedToken = decoded
          next()
        }
      })
    }
 }

 module.exports = {
    restricted
 }
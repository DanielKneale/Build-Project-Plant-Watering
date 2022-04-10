const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../../config")
const { findBy } = require("../users/userModel")

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

const checkPayLoadReg = (req,res,next)=>{
    if(!req.body.username || !req.body.password || !req.body.phone){
      res.status(401).json("Username, Password, and phone required")
    }else{
      next()
    }
  }

const checkLoginInfo = (req,res,next)=>{
    if(!req.body.username || !req.body.password){
      res.status(401).json("Username,and Password required")
    }else{
      next()
    }
  }

const checkUserAvailability = async (req,res,next)=>{
    try{
      const rows = await findBy({username:req.body.username})
      if(!rows.length){
        next()
      }else{
        res.status(401).json("Sorry, that username already exists")
      }
    }catch(e){
      res.status(500).json(`server error:: ${e.message}`)
    }
  }

 module.exports = {
    restricted,
    checkPayLoadReg,
    checkLoginInfo,
    checkUserAvailability
 }
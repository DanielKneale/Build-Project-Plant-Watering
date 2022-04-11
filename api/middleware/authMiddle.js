const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../../config")
const { findBy, findById } = require("../users/userModel")
const plantMod = require("../plants/plantsModel")

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
// compare the id to match the foriegn key
  const checkOwnsPlant = async (req,res,next) => {
    try{
      const user = await findById(req.params.userid)
      const plant = await plantMod.findById(req.params.plantid)
      if(user.id === plant.owner){
        next()
      }else{
        res.status(401).json("Woops thats not your plant")
      }
    }catch(e){
      res.status(500).json(`server error:: ${e.message}`)
    }
  }

 module.exports = {
    restricted,
    checkPayLoadReg,
    checkLoginInfo,
    checkUserAvailability,
    checkOwnsPlant
 }
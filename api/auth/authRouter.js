const router = require('express').Router();
const bcrypt = require("bcrypt")
const { add, findBy } = require("../users/userModel");
const jwt = require("jsonwebtoken")
const { BCRYPT_ROUNDS, JWT_SECRET } = require('../../config')
const { checkPayLoadReg,checkLoginInfo,checkUserAvailability  } = require("../middleware/authMiddle")

function makeToken(user){
    const payload = {
      subject:user.id,
      username: user.username,
    }
    const options = {
      expiresIn:"500s"
    }
    return jwt.sign(payload,JWT_SECRET,options)
}

router.post('/register',checkPayLoadReg,checkUserAvailability, async (req, res) => {
  try{
    const hash = bcrypt.hashSync(req.body.password,BCRYPT_ROUNDS)
    const userInfo = await add({username:req.body.username,phone:req.body.phone,password:hash})
    res.status(201).json(userInfo)
  }catch(e){
    res.status(500).json(`Server error: ${e.message}`)
  }
});

router.post('/login',checkLoginInfo, (req, res) => {
  let {username, password} = req.body
  findBy({username})
    .then(([user])=>{
      const verified = bcrypt.compareSync(password, user.password) 
      if(verified){
        const token = makeToken(user)
        res.status(200).json({message:`Welcome, ${user.username}`,token})//remove token later
      }else{
        res.status(401).json("username or password incorrect")
      }
    })
    .catch()

});


module.exports = router;

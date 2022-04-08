const router = require('express').Router();
const bcrypt = require("bcrypt")
const { add, findBy } = require("../users/users-model");
const jwt = require("jsonwebtoken")
const { BCRYPT_ROUNDS, JWT_SECRET } = require('../../config')

function makeToken(user){
    const payload = {
      subject:user.id,
      username: user.username,
    }
    const options = {
      expiresIn:"500s"
    }
    return jwt.sign(payload,JWT_SECRET, options)
}

router.post('/register',checkPayLoad,checkUserInDb, async (req, res) => {
  console.log("register")
  try{
    const hash = bcrypt.hashSync(req.body.password,BCRYPT_ROUNDS)
    const userInfo = await add({username:req.body.username,phone:req.body.phone,password:hash})
    res.status(201).json(userInfo)
  }catch(e){
    res.status(500).json(`Server errpr: ${e.message}`)
  }
});

router.post('/login', (req, res) => {
  let {username, password} = req.body
  const verified = bcrypt.compareSync(password, req.userData.password) 
  findBy({username})
    .then(([user])=>{
      if(verified){
        const token = makeToken(user)
        res.status(200).json({message:`Welcome, ${req.userData.username}`,token})
      }else{
        res.status(401).json("username or password incorrect")
      }
    })
    .catch()

});


module.exports = router;

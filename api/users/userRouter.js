const {findUsersPlants, add, remove, edit} = require("../plants/plantsModel")
const {checkOwnsPlant} = require('../middleware/authMiddle')
const user = require('../users/userModel')
const bcrypt = require("bcrypt")
const router = require('express').Router();
const { BCRYPT_ROUNDS} = require('../../config')

router.get('/:userid', async (req, res) => {
    const userid = req.params.userid
    const plants = await findUsersPlants(userid)

    res.status(200).json(plants);
});

router.post('/:userid', async (req, res) =>{
  try{
    const newPlant = await add({nickname:req.body.nickname,species:req.body.species,h2oFrequency:req.body.h2oFrequency,owner:req.params.userid})
    res.status(201).json(newPlant)
  }catch(e){
    res.status(500).json(`Server error: ${e.message}`)
  }
})

router.put('/:userid/:plantid',checkOwnsPlant, async (req,res) =>{
  try {
    const editedPlant = await edit(req.params.plantid, req.body)
    res.json(editedPlant)
  } catch(e) {
    res.status(500).json(`Server error: ${e.message}`)
  }
})

router.put('/:userid',async (req,res) =>{
  try {
    const hash = bcrypt.hashSync(req.body.password,BCRYPT_ROUNDS)
    const editedUser = await user.edit(req.params.userid, {phone:req.body.phone,password:hash})
    res.json(editedUser)
  } catch(e) {
    res.status(500).json(`Server error: ${e.message}`)
  }
})

router.delete('/:userid/:plantid',checkOwnsPlant, async (req,res) => {
  try {
    const removedPlant = await remove(req.params.plantid)
    res.json(removedPlant)
  } catch(e) {
    res.status(500).json(`Server error: ${e.message}`)
  }
})

module.exports = router;

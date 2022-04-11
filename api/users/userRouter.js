const {findUsersPlants, add, remove} = require("../plants/plantsModel")
const {checkOwnsPlant} = require('../middleware/authMiddle')
const router = require('express').Router();

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

})

router.delete('/:userid/:plantid',checkOwnsPlant, async (req,res) => {
  try {
    const removedPlant = await remove(req.params.plantid)
    res.json(removedPlant)
  } catch (e) {
    res.status(500).json(`Server error: ${e.message}`)
  }
})

module.exports = router;

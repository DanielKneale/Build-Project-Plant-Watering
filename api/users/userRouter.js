const {findUsersPlants} = require("../plants/plantsModel")
const router = require('express').Router

router.get('/:username', async (req, res) => {
    const ownerName = req.params.username

    const plants = await findUserPlants(ownername, id)

    res.status(200).json(plants);
  });
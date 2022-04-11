const db = require('../../data/dbConfig')

module.exports = {
    add,
    find,
    findById,
    findUsersPlants,
    remove,
    edit
}


function find() {
    return db('plants').select('id', 'nickname','species','h2oFrequency')
}
  
function findById(id) {
    return db('plants')
    .where({ id })
    .first()
}

function findUsersPlants(userId) {
    return db('plants').select('id','nickname','species','h2oFrequency')
    .where('owner', userId)
}

async function add(plant) {
    const [id] = await db('plants').insert(plant)
    return findById(id)
}

async function remove(id) {
    const deletedPlant = await findById(id)
    await db("plants").where("id",id).delete()
    return deletedPlant
}

async function edit(id,{nickname,species,h2oFrequency}) {
    await db("plants").where("id",id).update({nickname,species,h2oFrequency})
    return findById(id)
}
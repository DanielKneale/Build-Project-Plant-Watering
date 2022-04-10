const db = require('../../data/dbConfig')

module.exports = {
    add,
    find,
    findById,
    findUsersPlants
}


function find() {
    return db('plants').select('id', 'nickname','species','h2oFrequency')
}
  
function findById(id) {
    return db('plants')
    .where({ id })
    .first()
}

function findUsersPlants(username,owner) {
    return db('plants as p').join('users as u').select()
    .where(owner === username)
}

async function add(plant) {
    const [id] = await db('plants').insert(plant)
    return findById(id)
}


const db = require('../../data/dbConfig')

module.exports = {
    add,
    find,
    findById
}


function find() {
    return db('plants').select('id', 'nickname','species','h2oFrequency')
}
  
function findById(id) {
    return db('plants')
    .where({ id })
    .first()
}

async function add(plant) {
    const [id] = await db('plants').insert(plant)
    return findById(id)
}


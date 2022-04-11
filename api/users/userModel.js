const db = require('../../data/dbConfig')

module.exports = {
  add,
  find,
  findBy,
  findById,
  edit
}

function find() {
  return db('users').select('id', 'username','phone')
}

function findBy(filter) {
  return db('users').where(filter)
}

function findById(id) {
  return db('users')
    .where({ id })
    .first()
}

async function add(user) {
  const [id] = await db('users').insert(user)

  return findById(id)
}

async function edit(id,{phone,password}) {
  await db("users").where("id",id).update({phone,password})
  return findById(id)
}


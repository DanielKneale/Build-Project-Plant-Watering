const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const session = require('express-session')
const KnexSessionStore = require("connect-session-knex")(session)

const config = {
    name:'sessionId',
    secret:'Top Secret',
    cookie:{
        maxAge: 1000 * 60 * 60,
        secure:false,
        httpOnly:true
    },
    resave:false,
    saveUninitialized:false,

    store: new KnexSessionStore({
        knex:require("../data/dbConfig"),
        tablename:"sessions",
        sidfieldname:"sid", 
        createTable:true,
        clearInterval:100 * 60 * 60
    })
}

const authRouter = require('./auth/authRouter')

const server = express()

server.use(helmet());
server.use(cors())
server.use(express.json())
server.use(session(config))

server.use('/auth', authRouter)

server.get('/', (req, res) => {
    res.status(200).json("You've connected")
  })

module.exports = server;
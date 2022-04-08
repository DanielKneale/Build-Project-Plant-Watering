const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const session = require('express-session')
const KnexSessionStore = require("connect-session-knex")(session)

const config = {
    name:'sessionId',
    secret:'keep it secret',
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

const server = express()

server.use(helmet());
server.use(cors())
server.use(express.json())
server.use(session(config))
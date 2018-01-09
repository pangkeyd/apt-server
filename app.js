const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const mongoDB = process.env.DB_NAME
const db = mongoose.connection

mongoose.connect(mongoDB, {
  useMongoClient: true
})

mongoose.Promise = global.Promise

db.on('error', console.error.bind(console, 'MongoDB connection error!'))

// ROUTES

const index = require('./routers/index')

app.use('/', index)

// 404 PAGE

app.get('*', (req, res, next) => {
  let err = new Error()
  err.status = 404
  next(err)
})

app.listen(process.env.PORT_DEF, () => {
  console.log('AYO JALAN!')
})

module.exports = app
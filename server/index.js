'use strict'

const PORT        = 8080
const express     = require('express')
const bodyParser  = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app         = express()
const MONGODB_URI = 'mongodb://localhost:27017/tweeter'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`)
    throw err
  }
  console.log(`Database listen at: ${MONGODB_URI}`)
  const DataHelpers = require('./lib/data-helpers.js')(db)
  const tweetsRoutes = require('./routes/tweets')(DataHelpers)

  app.use('/tweets', tweetsRoutes)
  app.listen(PORT, () => {
    console.log('Example app listening on port ' + PORT)
  })
})


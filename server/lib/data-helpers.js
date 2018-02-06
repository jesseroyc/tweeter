'use strict'

module.exports = function makeDataHelpers (db) {
  return {

    saveTweet: function (newTweet, callback) {
      db.collection('tweets').insertOne(newTweet, (err, res) => {
        if (err) {
          res.status(500).json({ error: err.message })
        } else {
          callback(err, res)
        }
      });
    },

    getTweets: function (callback) {
      db.collection('tweets').find().toArray((err, tweets) => {
        if (err) {
          res.status(500).json({ error: err.message })
        } else {
          const sortNewestFirst = (a, b) => a.created_at - b.created_at
          callback(null, tweets.sort(sortNewestFirst))
        }
      });
    }
  }
}

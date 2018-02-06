'use strict'

module.exports = function makeDataHelpers (db) {
  return {

    saveTweet: function (newTweet, callback) {
      db.collection('tweets').insertOne(newTweet)
      callback(newTweet, true)
    },

    getTweets: function (callback) {
      db.collection('tweets').find().toArray((err, tweets) => {
          const sortNewestFirst = (a, b) => a.created_at - b.created_at
          callback(null, tweets.sort(sortNewestFirst))
      })
    }
  }
}

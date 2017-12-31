'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('blogs', {
  title: {
    type: STRING,
    unique: true
  },
  content: {
    type: STRING
  },
  photoFileName: {
    type: STRING
  }
})

// module.exports.associations = (Thing, {User, Favorite}) => {
//   Thing.belongsToMany(User, {as: 'lovers', through: Favorite})
// }

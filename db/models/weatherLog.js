'use strict'

const {STRING, DATEONLY, ARRAY, TIME, ENUM, INTEGER, TEXT} = require('sequelize')

module.exports = db => db.define('weatherLogs', {
  date: {
    type: STRING
  },
  time: {
    type: INTEGER
  },  
  user_Name: {
    type: STRING
  },
  location: {
    type: STRING
  },
  windSpeed: {
    type: INTEGER
  },
  windDirection: {
    type: STRING
  },
  conditions: {
    type: TEXT
  }
})

module.exports.associations = (WeatherLog, {User}) => {
  WeatherLog.User = WeatherLog.belongsTo(User)
}
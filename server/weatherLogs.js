'use strict'

const db = require('APP/db')
const WeatherLog = db.model('weatherLogs')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    mustBeLoggedIn,
    (req, res, next) =>
      WeatherLog.findAll()
        .then(logs => {
          res.json(logs)
      })
        .catch(next))
  // .post('/',
  //   (req, res, next) =>
  //     User.create(req.body)
  //     .then(user => res.status(201).json(user))
  //     .catch(next))
  // .get('/:id',
  //   mustBeLoggedIn,
  //   (req, res, next) =>
  //     User.findById(req.params.id)
  //     .then(user => res.json(user))
  //     .catch(next))

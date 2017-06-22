'use strict'

const db = require('APP/db')
const Blog = db.model('blogs')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      Blog.findAll()
        .then(blogs => res.json(blogs))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Blog.create(req.body)
      .then(blog => res.status(201).json(blog))
      .catch(next))

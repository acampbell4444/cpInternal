'use strict'

const db = require('APP/db')
const Blog = db.model('blogs')
const multiparty = require('multiparty')
const fs = require('fs')
const path = require('path')
const {resolve, join} = require('path')

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
  .post('/photos',
    (req, res, next) =>
       saveImage(req, res)
  )

function saveImage(req, res) {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if (err) console.error(err)
    const {path: tempPath, originalFilename} = files.imageFile[0]
    const copyToPath = path.join('images', originalFilename)
    fs.readFile(tempPath, (err, data) => {
      if (err) console.error(err)
      fs.writeFile(path.join(__dirname, copyToPath), data, (err) => {
        if (err) console.error(err)
        fs.unlink(tempPath, () => {
          res.send('File uploaded to: ' + copyToPath)
        })
      })
    })
  })
}

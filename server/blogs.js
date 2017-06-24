'use strict'

const db = require('APP/db')
const Blog = db.model('blogs')
let multiparty = require('multiparty');
let fs = require('fs');


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
  let form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    let {path: tempPath, originalFilename} = files.imageFile[0];
    let copyToPath = "/images/" + originalFilename;
    fs.readFile(tempPath, (err, data) => {
      // make copy of image to new location
      fs.writeFile(__dirname + copyToPath, data, (err) => {
        // delete temp image
        fs.unlink(tempPath, () => {
          res.send("File uploaded to: " + copyToPath);
        })
      })
    })
  })
}

    






  
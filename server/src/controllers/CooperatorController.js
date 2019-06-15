const Cooperator = require('../models/Cooperator')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

module.exports = {
  async index(req, res){
    const posts = await Cooperator.find().sort('-createdAt')

    return res.json(posts)
  },
  async store(req, res){
    const {name, description, salary} = req.body
    var image = req.file.filename

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70})
      .toFile(
        path.resolve(req.file.destination, 'resized', image)
      )

        fs.unlinkSync(req.file.path)
        
    const post = await Cooperator.create({
      name,
      description,
      salary,
      image
    })

    req.io.emit('post', post)
    
    return res.json(post)
  }
}
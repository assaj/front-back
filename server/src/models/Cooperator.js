const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  salary: Number
},{ timestamps: true})

module.exports = mongoose.model('Cooperator',PostSchema)
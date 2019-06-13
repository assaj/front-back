const Cooperator = require('../models/Cooperator')

module.exports = {
  async update(req, res){
    const post = await Cooperator.findById(req.params.id)
    
    post.salary += parseInt(req.params.salary)
    post.save()

    req.io.emit('update', post)

    return res.json(post)
  }
}
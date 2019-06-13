const Cooperator = require('../models/Cooperator')

module.exports = {
  async remove(req, res){
    const post = await Cooperator.findById(req.params.id)
    
    post.remove()
    post.save()

    req.io.emit('remove', post)

    return res.json(post)
  }
}
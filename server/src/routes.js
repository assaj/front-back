const express = require('express')
const multer = require("multer")
const uploadConfig = require('./config/upload')
const CooperatorController = require('./controllers/CooperatorController')
const updateSalaryController = require('./controllers/updateSalaryController')
const removeCooperator = require('../src/controllers/removeCooperator')

const routes = new express.Router()
const upload = multer(uploadConfig)

routes.get('/posts', CooperatorController.index)
routes.post('/add',upload.single('image'), CooperatorController.store)
routes.post('/update/:id/:salary',updateSalaryController.update)
routes.delete('/posts/:id/',removeCooperator.remove)

module.exports = routes;
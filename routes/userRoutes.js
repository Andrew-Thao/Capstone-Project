const express = require('express')
const router = express.Router()

const userController = require('../Controllers/userController')

router.get('/', userController.show)
router.get('/index', userController.index)
router.get('/', userController.update)

module.exports = router
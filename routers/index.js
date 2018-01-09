const express = require('express')
const router = express.Router()
const Apt = require('../controllers/index')

router.get('/', Apt.getData)

module.exports = router
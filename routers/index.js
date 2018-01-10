const express = require('express')
const router = express.Router()
const Apt = require('../controllers/index')
const image = require('../lib/image')

router.get('/', Apt.getData)

router.post('/', image.multer.single('image'), image.sendUploadToGCS, Apt.postData,
(req, res, next) => {
  let data = req.body

  if(req.file && req.file.cloudStoragePublicUrl){
    data.imageUrl = req.file.cloudStoragePublicUrl
  }
})

router.delete('/delete/:id', Apt.deleteData)

module.exports = router
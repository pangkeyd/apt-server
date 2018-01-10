const Storage = require('@google-cloud/storage')

const storage = Storage({
  projectId: 'linear-time-184203',
  keyFilename: 'keyfile.json'
})

const bucketName = 'apt_bucket'

let createBuck = () => {
  storage
  .createBucket(bucketName)
  .then(() => {
    console.log(`Bucket ${bucketName} created.`)
  })
  .catch(err => {
    console.error('ERROR', err)
  })
}

const bucket = storage.bucket('apt_bucket')

let getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${bucketName}/${filename}`
}

let sendUploadToGCS = (req, res, next) => {
  if(!req.file){
    return next()
  }

  const gcsname = Date.now() + req.file.originalname
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      next()
    })
  })

  stream.end(req.file.buffer)
}

const Multer = require('multer')
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}
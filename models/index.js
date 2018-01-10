const mongoose = require('mongoose')
const Schema = mongoose.Schema

let apt = new Schema({
  title: String,
  date: String,
  location: String,
  category: String,
  image: String,
  description: String,
  views: {
    type: Number,
    default: 0
  },
  slug: String,
  tags: [{
    type: String
  }]
})

let Apt = mongoose.model('Apt', apt)

let getApt = (cb) => {
  Apt.find({}, (err, apt) => {
    if(err) res.status(500).send(err)
    cb(apt)
  })
}

let postApt = (body, file, cb) => {
  let title = body.title
  let d = new Date()
  let date = d.toDateString()
  let slug = title.split(' ').join('-')
  if(file){
    let tags = body.tag.split(',')
    let aptSchema = new Apt({
      title: title,
      date: date,
      location: body.location,
      category: body.category,
      image: file.cloudStoragePublicUrl,
      description: body.description,
      views: 0,
      slug: slug,
      tags: tags
    })
    aptSchema.save((err, apt) => {
      if(err) res.status(500).send(err)
      cb(apt)
    })
  }else if(!file && body.tag){
    let tags = body.tag.split(',')
    let aptSchema = new Apt({
      title: title,
      date: date,
      location: body.location,
      category: body.category,
      description: body.description,
      views: 0,
      slug: slug,
      tags: tags
    })
    aptSchema.save((err, apt) => {
      if(err) res.status(500).send(err)
      cb(apt)
    })
  }else if(!file && !body.tag){
    let aptSchema = new Apt({
      title: title,
      date: date,
      location: body.location,
      category: body.category,
      description: body.description,
      views: 0,
      slug: slug
    })
    aptSchema.save((err, apt) => {
      if(err) res.status(500).send(err)
      cb(apt)
    })
  }
}

module.exports = {
  getApt,
  postApt
}
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

module.exports = {
  getApt
}
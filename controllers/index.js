const apt = require('../models/index')

class Apt {

  static getData(req, res){
    apt.getApt(result => {
      res.send(result)
    })
  }

  static postData(req, res){
    apt.postApt(req.body, req.file, (result) => {
      res.send(result)
      console.log(result)
    })
  }

}

module.exports = Apt
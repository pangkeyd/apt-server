const apt = require('../models/index')

class Apt {

  static getData(req, res){
    apt.getApt(result => {
      res.send(result)
    })
  }

}

module.exports = Apt
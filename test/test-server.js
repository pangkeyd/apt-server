const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../app')

chai.use(chaiHttp)

describe('/GET || get all apt', () => {
  it('it should be GET all apt', (done) => {
    chai.request(server)
    .get('/')
    .end((err, res) => {
      if(err) done(err)
      res.should.have.status(200)
      done()
    })
  })
})
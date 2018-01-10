const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')
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

describe('/POST || post apt with image and one tag', () => {
  it('it should be POST apt with image and one tag', (done) => {
    chai.request(server)
    .post('/')
    .attach('image', fs.readFileSync('image.jpg'), 'image.jpg')
    .field('title', 'apt type 1')
    .field('location', 'jakarta')
    .field('category', 'type A')
    .field('description', "Lorem Ipsum is simply dummy text of the printing and typesetting industry.")
    .field('tag', 'apt')
    .end((err, res) => {
      if(err) done(err)
      res.should.have.status(200)
      done()
    })
  }).timeout(15000)
})

describe('/POST || post apt with image and tag more than one', () => {
  it('it should be POST apt with image and tag more than one', (done) => {
    chai.request(server)
    .post('/')
    .attach('image', fs.readFileSync('image.jpg'), 'image.jpg')
    .field('title', 'apt type 2 tag more')
    .field('location', 'bandung')
    .field('category', 'type B')
    .field('description', "Lorem Ipsum is simply dummy text of the printing and typesetting industry.")
    .field('tag', 'apt,type')
    .end((err, res) => {
      if(err) done(err)
      res.should.have.status(200)
      done()
    })
  }).timeout(15000)
})

describe('/POST || post apt without image and one tag', () => {
  it('it should be POST apt without image and one tag', (done) => {
    chai.request(server)
    .post('/')
    .field('title', 'apt tanpa gambar')
    .field('location', 'semarang')
    .field('category', 'type C')
    .field('description', "Lorem Ipsum is simply dummy text of the printing and typesetting industry.")
    .field('tag', 'apt')
    .end((err, res) => {
      if(err) done(err)
      res.should.have.status(200)
      done()
    })
  }).timeout(15000)
})

describe('/POST || post apt without image and tag more than one', () => {
  it('it should be POST apt without image and tag more than one', (done) => {
    chai.request(server)
    .post('/')
    .field('title', 'apt tanpa gambar dan tag lebih')
    .field('location', 'jakarta')
    .field('category', 'type D')
    .field('description', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
    .field('tag', 'apt,type')
    .end((err, res) => {
      if(err) done(err)
      res.should.have.status(200)
      done()
    })
  })
})

describe('/POST || post apt without image and tag', () => {
  it('it should be POST apt without image and tag', (done) => {
    chai.request(server)
    .post('/')
    .field('title', 'apt tanpa gambar dan tag')
    .field('location', 'jakarta')
    .field('category', 'type E')
    .field('description', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
    .end((err, res) => {
      if(err) done(err)
      res.should.have.status(200)
      done()
    })
  })
})
/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const gimliAxe = 'Two Handed Axe'
    const axePrice = 1337.00

    beforeEach(() => {
      return Product.create({
        title: gimliAxe,
        price: axePrice
      })
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal(gimliAxe)
          expect(res.body[0].description).to.be.equal(null)
        })
    })

    it('POST /api/products', () => {
      return request(app)
        .post('/api/products')
        .send({title: 'Rusty Sword', price: 0.99})
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.title).to.be.equal('Rusty Sword')
        })
    })

    it('PUT /api/products/1', () => {
      return request(app)
        .put('/api/products/1')
        .send({title: 'Friendship Ring'})
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.title).to.be.equal('Friendship Ring')
        })
    })

    // What is the protocol on testing using Supertest
    it('DELETE /api/products/1', () => {
      return request(app)
        .delete('/api/products/1')
        .then(res => {
          expect(res.status).to.be.equal(204)
        })
        .then(() => {
          return Product.findAll({})
        })
        .then(products => {
          expect(products.length).to.be.equal(0)
        })
    }) // end describe('/api/products')
  }) // end describe('Product routes')
})

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
    const axePrice = '1337.00'
    const axeCategories = 'dwarf, weapon'

    beforeEach(() => {
      return Product.create({
        title: gimliAxe,
        price: axePrice,
        categories: axeCategories
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
          expect(res.body[0].categories.length).to.be.equal(2)
        })
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')

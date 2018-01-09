const {expect} = require('chai');
const db = require('../db');
const Product = db.model('product');

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('setter method and creation', () => {
    let newProduct;

    beforeEach(() => {
      return Product.create({
        title: 'Sword',
        price: '49.50',
        categories: 'sword, old'
      })
      .then(product => {newProduct = product})
    })

    it('properly updates the database TITLE', () => {
      expect(newProduct.title).to.be.equal('Sword')
    })

    it('properly updates the database PRICE', () => {
      expect(newProduct.price).to.be.equal('49.50')
    })

    it('properly updates the database CATEGORIES', () => {
      expect(newProduct.categories[0]).to.be.equal('sword')
    })
  })
})

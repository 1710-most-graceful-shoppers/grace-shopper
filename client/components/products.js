import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const prod = [
  {name: 'Small Sword', price: 10, id: 1, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'},
  {name: 'Big Sword', price: 20, id: 2, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'},
  {name: 'Demon Blade', price: 80, id: 3, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'},
  {name: 'Crystal Blade', price: 100, id: 4, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'},
  {name: 'Broadsword', price: 70, id: 5, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'},
  {name: 'Katana', price: 70, id: 6, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'},
  {name: 'Cursed Blase', price: 120, id: 7, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'},
  {name: 'Master Sword', price: 400, id: 8, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'},
]


const Products = (props) => {

  return (
    <div>
      <h1>All Products</h1>
      <div className="product-container">
        {
          prod.map(product => (
            <div key={product.id} className="card">
              <div>
                <div>
                  <img src={product.imageUrl} className="product-image"/>
                </div>
              </div>
              <div className="product-info">
                <div className="product-name">
                  {product.name}
                </div>
                <div className="product-price">
                  {product.price} Coins
                </div>
              </div>
            </div>
            )
          )
        }
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {}
}

const mapDispatch = (dispatch) => {
  return {}
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Products))

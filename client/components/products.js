import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import {addCartIdToSession} from '../store';


const Products = (props) => {

  const {products, addToCart} = props

  return (
    <div>
      <h1>All Products</h1>
      <div className="product-container">
        {
          products.map(product => (
            <div key={product.id}>
            <NavLink to={`/products/${product.id}`} >
            <div className="card">
              <div>
                <div>
                  <img src={product.imageUrl} className="product-image"/>
                </div>
              </div>
              <div className="product-info">
                <div className="product-name">
                  {product.title}
                </div>
                <div className="product-price">
                  {product.price} Coins
                </div>
              </div>
            </div>
          </NavLink>
          <button onClick={() => addToCart(product.id)} >Add me to cart!
          </button>
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
  return {
    products: state.products
  }
}

const mapDispatch = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addCartIdToSession(id))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Products)

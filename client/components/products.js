import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'


class Products extends Component {
  constructor(props){
    super(props);

    this.state = {
      input: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  render(){

    const products = this.props.products.filter(product => product.title.toLowerCase().match(this.state.input))

    return (
      <div>
        <div className="product-header">
          <h1 className="product-title">All Products</h1>
          <form className="product-filter" style={{marginTop: '20px'}}>
            <input
              className="product-filter-input"
              placeholder="Filter Products"
              onChange={this.handleChange}
              />
          </form>
        </div>
        <div className="product-container">
          {
            products.map(product => (
              <NavLink to={`/products/${product.id}`} key={product.id}>
                <div className="card">
                  <div>
                    <div>
                      <img src={product.imageUrl} className="product-image" />
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
            )
          )
        }
      </div>
    </div>
  )
  }

handleChange(event){
  this.setState({
    input: event.target.value.toLowerCase()
  })
}

}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    products: state.products
  }
}

const mapDispatch = null;

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Products)

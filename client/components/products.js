import React, {Component} from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import {addCartIdToSession} from '../store';

import Card from './Card'


export class Products extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  render() {
    const products = this.props.products.filter(product => product.title.toLowerCase().match(this.state.input))

    return (
      <div>
        <div className="product-header">
          <div className="product-title-container">
            <h1 className="product-title">All Products</h1>
          </div>
          <div className="product-filter">
            <input
            className="product-filter-input"
            placeholder="Filter Products"
            onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="view-container">
          <div className="product-container">
            {
              products.map(product => (
                <div key={product.id}>
                  <NavLink to={`/products/${product.id}`} >
                    <Card productInfo={product} />
                  </NavLink>
                </div>
                )
              )
            }
          </div>
        </div>
      </div>
    )
  }
  handleChange(event) {
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

const mapDispatch = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addCartIdToSession(id))
  }
}

export default connect(mapState, mapDispatch)(Products)

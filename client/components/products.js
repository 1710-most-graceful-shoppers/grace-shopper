import React, {Component} from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import {addCartIdToSession, updateCart, updateSessionCart, updateProductListing, getProductsFromServer } from '../store';
import {Sidebar} from './index'
import Card from './Card'


export class Products extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    let category = this.props.match.params.category
    if (category) {
      this.props.updateProducts(category)
    } else {
      this.props.loadProducts()
    }
  }

  render() {
    const products = this.props.products.filter(product => product.title.toLowerCase().match(this.state.input))
    const {addMe, userId, ownProps } = this.props;
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
          <div className="sidebar-container">
            <Sidebar ownProps={ownProps} />
          </div>
          <div className="product-container">
            {
              products.map(product => (
                <div key={product.id}>
                  <NavLink to={`/products/${product.id}`} >
                    <Card productInfo={product} />
                  </NavLink>
                  <button onClick={() => {addMe(userId, product.id)}}>Add me to cart!</button>
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
const mapState = (state, ownProps) => {
  return {
    userId: state.user.id,
    products: state.products,
    ownProps: ownProps
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    addToCart: (id) => dispatch(addCartIdToSession(id)),
    addMe: (userId, productId) => {userId ? dispatch(updateCart(userId, productId, 1)) : dispatch(updateSessionCart(productId, 1))},
    updateProducts: (name) => dispatch(updateProductListing(name, ownProps)),
    loadProducts: () => dispatch(getProductsFromServer())
  }
}

export default connect(mapState, mapDispatch)(Products)

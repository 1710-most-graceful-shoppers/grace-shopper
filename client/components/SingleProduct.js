
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Reviews} from './index.js';
import {updateCart, updateSessionCart, getSingleProduct} from '../store';

class SingleProduct extends Component {

  constructor(props){
    super(props);
    this.state = null;
  }

  componentDidMount(){
    let id = Number(this.props.match.params.id);
    this.props.getProduct(id)
  }

    render(){
      const {products, addMe, userId} = this.props;
      const product = products[0];
      console.log('product: ', product)

      return product ? (
        <div>
          <div>
            <h1>{product.title}</h1><button onClick={() => {addMe(userId, product.id)}}>Add me to cart!</button>
            <h2>{product.description}</h2>
            <h3>{product.price}</h3>
            <h3>Hi</h3>
            <img src={product.imageUrl} />
          </div>
          <h3>REVIEWS</h3>
          <div>
          </div>
        </div>
      ) : null
    }

  }

const mapState = (state, ownProps) => {
  return {
    products: state.products,
    productId: ownProps.match.params.productId,
    userId: state.user.id
  }};

const mapDispatch = (dispatch) => {
  return {
    addMe: (userId, productId) => {userId ? dispatch(updateCart(userId, productId, 1)) : dispatch(updateSessionCart(productId, 1))},
    getProduct: (id) => dispatch(getSingleProduct(id))
  }
};

export default connect(mapState, mapDispatch)(SingleProduct);

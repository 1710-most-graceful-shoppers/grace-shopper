import React from 'react';
import {connect} from 'react-redux';
import {Reviews} from './index.js';
import {updateCart} from '../store';

const SingleProduct = (props) => {
    const {products, productId, addMe, userId} = props;
    const product = products.find((ele) => ele.id === Number(productId))
    const inStock = product ? (product.inventory === 0 ? 'Out of stock! Unavailable' : 'In Stock - Purchase now!') : '';
    return product ?
    (
      <div>
        <div>
          <h1>{product.title}</h1><button onClick={() => {addMe(userId, product.id)}}>Add me to cart!</button>
          <h2>{product.description}</h2>
          <h3>{product.price}</h3>
          <h3>{inStock}</h3>
          <img src={product.imageUrl} />
        </div>
        <h3>REVIEWS</h3>
        <div>
          <Reviews reviews={product.reviews} />
        </div>
      </div>
    ) : null;
  }

const mapState = (state, ownProps) => {
  return {
    products: state.products,
    productId: ownProps.match.params.productId,
    userId: state.user.id
  }};

const mapDispatch = (dispatch) => {
  return {
    addMe: (userId, productId) => dispatch(updateCart(userId, productId, 1))
  }
};

export default connect(mapState, mapDispatch)(SingleProduct);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Reviews from './index.js';

class SingleProduct extends Component {

  render() {
    const {products, productId} = this.props;
    const product = products.find((ele) => ele.id === Number(productId))
    return product ?
    (
      <div>
        <div>
          <h1>{product.title}</h1>
          <h2>{product.description}</h2>
          <h3>{product.price}</h3>
          <img src={product.imageUrl} />
        </div>
        <h3>REVIEWS</h3>
      </div>
    ) : null;
  }
}

const mapState = (state, ownProps) => {
  return {
    products: state.products,
    productId: ownProps.match.params.productId
  }};

const mapDispatch = null;

export default connect(mapState)(SingleProduct);

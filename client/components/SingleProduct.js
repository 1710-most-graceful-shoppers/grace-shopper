import React, {Component} from 'react';
import {connect} from 'react-redux';
import Reviews from './index.js';

const dummyData = [{
  id: 1,
  title: 'Sword',
  description: 'Such a heavy sword',
  price: '35',
  imageUrl: '/ProductModel/defaultPhoto.jpeg',
  categories: ['amazing', 'heavy'],
  reviews: []
}
]

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: dummyData
    }
  }
  render() {
    const {products, productId} = this.props;
    const product = this.state.products.find((ele) => ele.id === Number(productId))
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

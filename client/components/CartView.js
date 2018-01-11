import React, {Component} from 'react';
import {connect} from 'react-redux';

class CartView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {products, cartIds} = this.props;
    const cartProducts = products.filter(product => Object.keys(cartIds).map(cardId => Number(cardId)).includes(product.id))
    console.log(Object.keys(cartIds))
    return (
      <ul>
      {cartProducts.map(product => {
        return (
          <li key={product.id}>{product.title} quantity: {cartIds[product.id]}</li>
        )}
      )}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    cartIds: state.cartIds
  }
}

export default connect(mapStateToProps)(CartView)

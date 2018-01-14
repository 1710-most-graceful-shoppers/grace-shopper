import React from 'react';
import {connect} from 'react-redux';

function Cart(props) {
  const {products, cartIds} = props;
  const cartProducts = products.filter(product => Object.keys(cartIds).map(cardId => Number(cardId)).includes(product.id))
  return (
      <div className="cart">
        <ul>
        {cartProducts.map(product => {
          return (
            <li className="cart-item" key={product.id}>{product.title} quantity: {cartIds[product.id]}</li>
          )}
        )}
        </ul>
      </div>
  )
}


const mapStateToProps = (state) => {
  return {
    products: state.products,
    cartIds: state.cartIds
  }
}

export default connect(mapStateToProps)(Cart)

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateCart, updateSessionCart, deleteFromCart, deleteFromSessionCart} from '../store';

const Cart = (props) => {
  const {userId, sessionCart, userCart, addMe, subtractMe, deleteMe} = props;
  const cart = userId ? userCart : sessionCart;
  let totalCost = 0;
  return cart.products ? (
    <div className="cart">
    {cart.products.map(product => {
      totalCost = totalCost + product.product_order.quantity * product.price;
      return (
        <div key={product.id} className="cart-product">
          <Link to={`/products/${product.id}`}><h4>Name: {product.title}</h4></Link>
          <h4>Quantity: {product.product_order.quantity}
            <button onClick={() => addMe(userId, product.id)}>+</button>
            <button
              onClick={() => subtractMe(userId, product.id)}
              disabled={(product.product_order.quantity === 1)}>-</button>
            <button onClick={() => deleteMe(userId, product.id)}>Remove Product</button>
          </h4>
          <h4>Current Price: {product.price} coins ; Subtotal: {product.price * product.product_order.quantity} coins</h4>
        </div>
      )
    })}
    {/* USE STRIPE for payment processing */}
    <h3>Total Cost: {totalCost} coins</h3><button>Checkout!</button>
    </div>
  ) : null;
};

const mapState = (state) => ({
  userId: state.user.id,
  sessionCart: state.sessionCart,
  userCart: state.userCart
});

//Utility function to handle this 

const mapDispatch = (dispatch) => ({
  addMe: (userId, productId) => {userId ? dispatch(updateCart(userId, productId, 1)) : dispatch(updateSessionCart(productId, 1))},
  subtractMe: (userId, productId) => {userId ? dispatch(updateCart(userId, productId, -1)) : dispatch(updateSessionCart(productId, -1))},
  deleteMe: (userId, productId) => {userId ? dispatch(deleteFromCart(userId, productId)) : dispatch(deleteFromSessionCart(productId))}
})

export default connect(mapState, mapDispatch)(Cart);

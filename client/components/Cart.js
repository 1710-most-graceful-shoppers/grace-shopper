import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateCart, deleteFromCart} from '../store';

const Cart = (props) => {
  const {userId, isLoggedIn, sessionCart, userCart, addMe, subtractMe, deleteMe} = props;
  const cart = isLoggedIn ? userCart : sessionCart;
  return cart.products ? (
    <div className="cart">
    {cart.products.map(product => {
      return (
        <div key={product.id} className="cart-product">
          <Link to={`/products/${product.id}`}><h4>{product.title}</h4></Link>
          <h4>{product.product_order.quantity}</h4>
          <button onClick={() => addMe(userId, product.id)}>+</button><button onClick={() => subtractMe(userId, product.id)}>-</button>
          <h4>{product.price}</h4>
          <button onClick={() => deleteMe(userId, product.id)}>Remove Product</button>
        </div>
      )
    })}
    </div>
  ) : null;
};

const mapState = (state) => ({
  userId: state.user.id,
  isLoggedIn: !!state.user,
  sessionCart: state.sessionCart,
  userCart: state.userCart
});

const mapDispatch = (dispatch) => ({
  addMe: (userId, productId) => dispatch(updateCart(userId, productId, 1)),
  subtractMe: (userId, productId) => dispatch(updateCart(userId, productId, -1)),
  deleteMe: (userId, productId) => dispatch(deleteFromCart(userId, productId))
})

export default connect(mapState, mapDispatch)(Cart);

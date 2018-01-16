import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateCart, updateSessionCart, deleteFromCart, deleteFromSessionCart} from '../store';
import CheckoutForm from './CheckoutForm';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coreyPromo: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    (e.target.value === 'CoreyRulezOmriDroolz') ? this.setState({coreyPromo: true}) : this.setState({coreyPromo: false});
  }

  render() {
    const {userId, sessionCart, userCart, addMe, subtractMe, deleteMe} = this.props;
    const cart = userId ? userCart : sessionCart;
    let totalCost = 0;
    return cart.products ? (
      <div className="cart">
      {cart.products.map(product => {
        totalCost = totalCost + product.product_order.quantity * product.price;
        return (
          <div key={product.id} className="cart-product">
            <Link to={`/products/weapons/${product.id}`}><h4>Name: {product.title}</h4></Link>
            <h4>Quantity: {product.product_order.quantity}
              <button onClick={() => addMe(userId, product.id)}>+</button>
              <button
                onClick={() => subtractMe(userId, product.id)}
                disabled={(product.product_order.quantity === 1)}>
                -
              </button>
              <button onClick={() => deleteMe(userId, product.id)}>Remove Product</button>
            </h4>
            <h4>Current Price: {product.price} coins ; Subtotal: {product.price * product.product_order.quantity} coins</h4>
          </div>
        )
      })}
      {/* USE STRIPE for payment processing */}
      <h3>Total Cost: {this.state.coreyPromo ? totalCost / 2 : totalCost} coins {this.state.coreyPromo ? 'Heck yes, you said it, not me! You save 50%!' : 'You can do better.'}</h3>
      <button>Checkout!</button>
      <CheckoutForm promoChange={this.handleChange} />
      </div>
    ) : null;
  }
}

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

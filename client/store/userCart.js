import axios from 'axios';
//this cart is for a LOGGED IN user, so this obtains information directly from the database, not the session.
const GOT_CART = 'GOT_CART';
const CLEAR_CART = 'CLEAR_CART';

export function fetchCart(userId, cartId) {
  return (dispatch) => {
    axios.get(`/api/users/${userId}/${cartId}`)
    .then(response => response.data)
    .then(userCart => dispatch(gotCart(userCart)))
    .catch(console.error);
  }
}

export function updateCart(userId, cartId, productId, quantity) {
  return (dispatch) => {
    axios.put(`/api/users/${userId}/${cartId}`, {
      productId,
      quantity
    })
    .then(() => dispatch(fetchCart(userId, cartId)))
    .catch(console.error);
  }
}

export function deleteFromCart(userId, cartId, productId) {
  return (dispatch => {
    axios.delete(`/api/users/${userId}/${cartId}`, {productId})
    .then(() => dispatch(fetchCart(userId, cartId)))
    .catch(console.error);
  })
}

function gotCart(userCart) {
  return {
    type: GOT_CART,
    userCart
  }
}

function clearCart(userCart) {
  return {
    type: CLEAR_CART
  }
}

export default (userCart = {}, action) => {
  switch (action.type) {
    case GOT_CART:
      return action.userCart;
    case CLEAR_CART:
      return {};
    default:
      return userCart;
  }
}

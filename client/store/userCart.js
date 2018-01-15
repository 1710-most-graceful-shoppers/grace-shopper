import axios from 'axios';
//this cart is for a LOGGED IN user, so this obtains information directly from the database, not the session.
const GOT_CART = 'GOT_CART';
const CLEAR_CART = 'CLEAR_CART';

export function fetchCart(userId) {
  return (dispatch) => {
    axios.get(`/api/users/${userId}/cart`)
    .then(response => response.data)
    .then(userCart => dispatch(gotCart(userCart)))
    .catch(console.error);
  }
}

export function updateCart(userId, productId, quantity) {
  return (dispatch) => {
    axios.put(`/api/users/${userId}/cart`, {
      productId,
      quantity
    })
    .then(() => dispatch(fetchCart(userId)))
    .catch(console.error);
  }
}

export function deleteFromCart(userId, productId) {
  return (dispatch) => {
    axios.delete(`/api/users/${userId}/cart`, {
      data: {
        productId
      }
    })
    .then(() => dispatch(fetchCart(userId)))
    .catch(console.error);
  }
}

export function placeUserOrder(checkoutInfo, userId) {
  console.log(userId)
}

function gotCart(userCart) {
  return {
    type: GOT_CART,
    userCart
  }
}

export function clearCart() {
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

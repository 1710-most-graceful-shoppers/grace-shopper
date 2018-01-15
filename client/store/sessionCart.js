import axios from 'axios';
//this cart is for a non-logged in user

const GOT_SESSION_CART = 'GOT_SESSION_CART';
const CLEAR_SESSION_CART = 'CLEAR_SESSION';


//put logic here for cart vs session
export function updateSessionCart(productId, quantity) {
  return (dispatch) => {
  axios.put('/api/sessions/cart', {
    productId,
    quantity
  })
  .then(() => dispatch(fetchSessionCart()))
  .catch(console.error);
  }
}

export function deleteFromSessionCart(productId) {
  return (dispatch) => {
    axios.delete(`/api/sessions/cart`, {
      data: {
        productId
      }
    })
    .then(() => dispatch(fetchSessionCart()))
    .catch(console.error);
  }
}

export function fetchSessionCart() {
  return (dispatch) => {
    axios.get('/api/sessions/cart')
    .then(response => dispatch(gotSessionCart(response.data)))
    .catch(console.error)
  }
}

function gotSessionCart (sessionCart) {
  return {
    type: GOT_SESSION_CART,
    sessionCart
  }
}

export default (sessionCart = {}, action) => {
  switch (action.type) {
    case GOT_SESSION_CART:
      return action.sessionCart;
    case CLEAR_SESSION_CART:
      return {};
    default:
      return sessionCart;
  }
}

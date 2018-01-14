import axios from 'axios';

const GOT_CART_IDS = 'GOT_CART_IDS';

const gotCartIds = (cartIds) => (
  {type: GOT_CART_IDS,
  cartIds}
)

export function addCartIdToSession(id) {
  return (dispatch) => {
  axios.put('/api/session/cartIds', {id})
  .then(() => dispatch(getCartIdsFromSession()))
  .catch(console.error);
  }
}

export function getCartIdsFromSession() {
  return (dispatch) => {
    axios.get('/api/session/cartIds')
    .then(response => dispatch(gotCartIds(response.data)))
    .catch(console.error)
  }
}

export default (cartIds = {}, action) => {
  switch (action.type) {
    case GOT_CART_IDS:
      return action.cartIds;
    default:
      return cartIds;
  }
}

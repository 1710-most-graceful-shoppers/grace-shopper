import axios from 'axios';

const GET_ORDERS = 'GET_ORDER'

function getOrdersAC(orders) {
  return {
    type: GET_ORDERS,
    orders
  }
}

export function getOrders(userId) {
  return (dispatch) => {
    axios.get(`/api/users/${userId}/orders`)
      .then(res => dispatch(getOrdersAC(res.data)))
      .catch(console.error);
  }
}

export default (initialState = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return initialState;
  }
}


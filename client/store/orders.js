import axios from 'axios';

const GET_ORDERS = 'GET_ORDER'

function getOrders(orders) {
  return {
    type: GET_ORDERS,
    orders
  }
}

export function getOrders(userId) {
  return (dispatch) => {
    axios.get(`/api/${userId}/orders`)
      .then(res => res.data)
      .then(orders => dispatch(getOrders))
  }
}

export default (initialState = {}, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return initialState;
  }
}


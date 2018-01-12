import axios from 'axios';

const GOT_PRODUCTS_FROM_SERVER = 'GOT_PRODUCTS_FROM_SERVER';

export function getProductsFromServer() {
  return (dispatch) => {
    axios.get('/api/products')
    .then(res => dispatch(gotProducts(res.data)))
    .catch(console.error);
  }
}

function gotProducts (products) {
  return {
    type: GOT_PRODUCTS_FROM_SERVER,
    products
  }
}

export default function productsReducer(initialState = [], action) {
  switch (action.type) {
    case GOT_PRODUCTS_FROM_SERVER:
      return action.products;
    default:
      return initialState;
  }
}

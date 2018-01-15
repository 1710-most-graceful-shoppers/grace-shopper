import axios from 'axios';

const GOT_PRODUCTS_FROM_SERVER = 'GOT_PRODUCTS_FROM_SERVER';
const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT';

export function getProductsFromServer() {
  return (dispatch) => {
    axios.get('/api/products')
    .then(res => dispatch(gotProducts(res.data)))
    .catch(console.error);
  }
}

export function updateProductListing(category, props){
  return (dispatch) => {
    axios.get(`/api/products/categories/${category}`)
    .then(res => {
      dispatch(updateProducts(res.data[0].products))
      props.history.push(`/products/${category}`)
    })
    .catch(console.error);
  }
}

export function getSingleProduct(id){
  return (dispatch) => {
    axios.get(`/api/products/${id}`)
    .then(res => dispatch(gotSingleProduct(res.data)))
    .catch(console.error)
  }
}

function gotSingleProduct (product){
  return {
    type: GOT_SINGLE_PRODUCT,
    product
  }
}

function gotProducts (products) {
  return {
    type: GOT_PRODUCTS_FROM_SERVER,
    products
  }
}

function updateProducts (products) {
  return {
    type: UPDATE_PRODUCTS,
    products
  }
}

export default function productsReducer(initialState = [], action) {
  switch (action.type) {
    case GOT_PRODUCTS_FROM_SERVER:
      return action.products;
    case GOT_SINGLE_PRODUCT:
      return [action.product];
    case UPDATE_PRODUCTS:
      return action.products;
    default:
      return initialState;
  }
}

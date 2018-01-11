import axios from 'axios'

const GET_CATEGORIES = 'GET_CATEGORIES'

const getCategories = categories => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function getCategoriesFromServer() {
  return (dispatch) => {
    axios.get('/api/categories')
    .then(res => dispatch(getCategories(res.data)))
    .catch(console.error)
  }
}

export default function categoriesReducer(initialState = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return initialState;
  }
}

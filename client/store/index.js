import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import products from './products';
import categories from './categories';
import sessionCart from './sessionCart';
import userCart from './userCart';
import orders from './orders';
import users from './users';

const reducer = combineReducers({user, products, sessionCart, categories, userCart, orders, users})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './sessionCart';
export * from './categories';
export * from './userCart';
export * from './orders';
export * from './users';

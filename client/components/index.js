/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {default as Products} from './Products'
export {default as Sidebar} from './Sidebar'
export {Login, Signup} from './auth-form'
export {default as SingleProduct} from './SingleProduct.js';
export {default as Cart} from './Cart'
export {default as CartView} from './CartView';

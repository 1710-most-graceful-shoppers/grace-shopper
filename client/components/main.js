import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn, userCart, sessionCart} = props
  const cart = isLoggedIn ? userCart : sessionCart;
  const items = cart.products ? cart.products.reduce((accum, product
   ) => product.product_order.quantity + accum, 0) : 0;
  return (
    <div>
      <nav>
        <h1 className="main-title">Sherwood</h1>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/products">Products</Link>
              <Link to="/cart">Cart ({items})</Link>
              <Link to="/orders">Orders</Link>
              <div className="main-auth">
                <a href="#" onClick={handleClick}>Logout</a>
              </div>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/products">Products</Link>
              <Link to="/cart">Cart ({items})</Link>
              <div className="main-auth">
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            </div>
        }
      </nav>
      <hr />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    userCart: state.userCart,
    sessionCart: state.sessionCart
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

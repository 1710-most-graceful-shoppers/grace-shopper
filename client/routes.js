import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {SingleProduct, Main, Login, Signup, UserHome, Products, Cart, Orders} from './components'
import {me, getProductsFromServer, fetchCart, getCategoriesFromServer} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
    // this.props.loadProducts()// Products now loaded on Product component
    this.props.loadCategories()
  }

  render () {
    const {isLoggedIn} = this.props
    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/products/:category/:id" component={SingleProduct} />
            <Route path="/products/:category" component={Products} />
            <Route path="/products/" component={Products} />
            <Route path="/cart" component={Cart} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                <Route path="/home" component={UserHome} />
                <Route path="/orders" component={Orders} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    userCartId: state.userCart.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    },
    loadProducts() {
      dispatch(getProductsFromServer())
    },
    loadCart(userId) {
      dispatch(fetchCart(userId))
    },
    loadCategories() {
      dispatch(getCategoriesFromServer())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

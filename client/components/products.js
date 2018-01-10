import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const prod = [
  {name: 'Small Sword', price: 10, id: 1, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'},
  {name: 'Big Sword', price: 20, id: 2, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'},
  {name: 'Demon Blade', price: 80, id: 3, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'},
  {name: 'Crystal Blade', price: 100, id: 4, imageUrl: 'http://www.cbswords.com/images/157022_157051.jpg'},
]


const Products = (props) => {

  return (
    <div>
      <h1>Products</h1>
      <table >
        {
          prod.map(product => (
            <tbody key={product.id} class="card">
              <tr>
                <td>
                  <img src={product.imageUrl} height="100" width="100"/>
                </td>
              </tr>
              <tr class="container">
                <td>
                  {product.name}
                </td>
                <td>
                  {product.price} Coins
                </td>
              </tr>
            </tbody>
            )
          )
        }
      </table>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {}
}

const mapDispatch = (dispatch) => {
  return {}
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Products))

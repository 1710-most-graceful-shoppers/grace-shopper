import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateProductListing, getProductsFromServer } from '../store'

const Sidebar = (props) => {
  const { categories, handleClick, loadProducts } = props

  return (
    <div className="sidebar">
      <Link to="/products" onClick={loadProducts}>
        <h3>Our Wares</h3>
      </Link>
      {
        categories.map(category => (
          <section key={category.id}>
            <h4 className="menu-item">
              <a href="#" name={category.name} onClick={handleClick}>{category.name}</a >
            </h4>
          </section>
        ))
      }
    </div>
  )
}

const mapState = (state, history) => {
  return {
    categories: state.categories,
    history: history
  }
}

const mapDispatch = (dispatch, history) => {
  let props = history.ownProps
  return {
    handleClick: function(evt){
      dispatch(updateProductListing(evt.target.name, props))
    },
    loadProducts: function() {
      dispatch(getProductsFromServer())
    }
  }
}

export default connect(mapState, mapDispatch)(Sidebar)

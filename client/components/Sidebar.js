import React from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateProductListing } from '../store'

const Sidebar = (props) => {
  const { categories, handleClick } = props
  return (
    <div className="sidebar">
      <h3>Categories</h3>
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

const mapState = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleClick: function(evt){
      dispatch(updateProductListing(evt.target.name))
    }
  }
}

export default connect(mapState, mapDispatch)(Sidebar)

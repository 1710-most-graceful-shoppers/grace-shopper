import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Sidebar = (props) => {
  const { categories } = props
  return (
    <div className="sidebar">
      <h3>Categories</h3>
      {
        categories.map(category => (
          <section key={category.id}>
            <h4 className="menu-item">
              <Link to={`/products/${category.name}`}>{category.name}</Link>
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

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Sidebar)

import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Sidebar = (props) => {
  const { categories } = props
  return (
    <sidebar>
      <h3>Categories</h3>
      {
        categories.map(category => (
          <section key={category.id}>
            <h4 className="menu-item">
              <Link to={`/categories/${category.id}`}>{category.name}</Link>
            </h4>
          </section>
        ))
      }
    </sidebar>
  )
}

const mapState = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatch = (dispatch) => {
  return {}
}

export default connect(mapState, mapDispatch)(Sidebar)

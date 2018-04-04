import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchCategories } from '../../actions'

import Loading from './Loading'

class Categories extends React.Component {

  static propTypes = {
    categories: PropTypes.array.isRequired,
    fetchCategories: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchCategories()
  }

  render() {
    const { categories, error, loading } = this.props

    if (error) { return <div>Error! {error.message}</div>; }

    if (loading) { return <Loading />}

    return (
      <div className="sidebar-module">
        <h4>Categories</h4>
        <ul className="list-unstyled">
          {categories.map(category =>
            <li key={category.name}>
              <Link to={ `/category/${category.path}` }>{category.name}</Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ categoriesReducer }) {

  return {
    categories: categoriesReducer.items,
    loading: categoriesReducer.loading,
    error: categoriesReducer.error
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Categories);
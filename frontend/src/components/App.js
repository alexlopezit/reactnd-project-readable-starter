import React from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/CategoriesActions'
// import { fetchCategories } from '../utils/api'

import Posts from './Posts'

class App extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchCategories());

    // fetchCategories()
    // .then(data => {
    //   console.log(data.categories)
      
    //   // this.setState({
    //   //   categories: data.categories,
    //   //   loading: false
    //   // })
    // })
  }

  render() {
    // const { categories } = this.state
    const { error, loading, categories } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <React.Fragment>

      <div className="blog-masthead">
        <div className="container">
          <nav className="blog-nav">
            <a className="blog-nav-item active" href="">Home</a>
          </nav>
        </div>
      </div>

      <div className='container'>

        <div className="blog-header">
          <h1 className="blog-title">Readable Blog</h1>
          <p className="lead blog-description">The official blog.</p>
        </div>

        <div className="row">
          <div className="col-sm-8 blog-main">
          
            {/* <Posts/> */}
            
            <div className="blog-post">
              <h2 className="blog-post-title">Sample blog post</h2>
              <p className="blog-post-meta">January 1, 2014 by <a>Mark</a></p>

              <p>This blog post shows a few different types of content that's supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>
              <hr/>
            </div>
          
          </div>

          <div className="col-sm-3 col-sm-offset-1 blog-sidebar">

            <div className="sidebar-module">
              <h4>Categories</h4>
              <ul className="list-unstyled">
                {categories.map(category =>
                  <li key={category.name}>
                    <Link to={ "/category/" + category.path }>{category.name}</Link>
                  </li>
                )}
              </ul>
            </div>
            
          </div>

        </div>

      </div>

      <footer className="blog-footer">
        <p>Blog by <a target="_blank" href="https://twitter.com/AlexLopezIT">@AlexLopezIT</a>.</p>
        <p>
          <a href="">Back to top</a>
        </p>
      </footer>
      </React.Fragment>
    )
  }
}

function mapStateToProps ({ categoriesReducer }) {

  // console.log('categoriesReducer', categoriesReducer)

  return {
    categories: categoriesReducer.items,
    loading: categoriesReducer.loading,
    error: categoriesReducer.error
  }
}

export default connect( mapStateToProps )(App);
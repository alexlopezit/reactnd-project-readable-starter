import React from 'react'

import Posts from './includes/Posts'
import Categories from './includes/Categories'
import Header from '../components/includes/Header'
import Nav from '../components/includes/Nav'
import Footer from '../components/includes/Footer'

export default class Home extends React.Component {
  render() {

    return (
      <React.Fragment>
        <Nav />
        <div className='container'>
          <Header />
          <div className="row">
            <div className="col-sm-8 blog-main">
              <Posts />
            </div>
            <div className="col-sm-3 col-sm-offset-1 blog-sidebar">
              <Categories />
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

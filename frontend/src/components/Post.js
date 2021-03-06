import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as moment from 'moment-timezone'
import PropTypes from 'prop-types'

import Loading from './includes/Loading'
import Categories from './includes/Categories'
import Header from '../components/includes/Header'
import Nav from '../components/includes/Nav'
import Footer from '../components/includes/Footer'
import { fetchPostById, votePost } from '../actions'

import Comments from './includes/Comments'

class Post extends React.Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
    fetchPostById: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { match } = this.props
    this.props.fetchPostById( match.params.postId)
  }

  vote = (value) => {
    const { match } = this.props
    this.props.votePost(match.params.postId, value)
  }

  render() {
    const { post, error, loading } = this.props
    const { vote } = this

    if (error) { return <div>Error! {error.message}</div>; }

    if (loading) { return <Loading />}

    return (
      <React.Fragment>
        <Nav />
        <div className='container'>
          <Header />
          <div className="row">
            <div className="col-sm-8 blog-main">
              {post &&
                <React.Fragment>
                  <h2 className="blog-post-title">{post.title}</h2>
                  <p className="blog-post-meta">Posted on {moment(post.timestamp).format("MM/DD/YYYY")} by {post.author} | <Link to={ `/category/${post.category}`}>{post.category}</Link></p>
                  <p>{post.body}</p>
                  <hr/>
                  Votes
                  <div className="btn-group">
                    <button type="button" onClick={ () => vote('downVote') } className="btn btn-default"><i className="fa fa-caret-down" /></button>
                    <button type="button" disabled className="btn btn-default">{post.voteScore}</button>
                    <button type="button" onClick={ () => vote('upVote') } className="btn btn-default"><i className="fa fa-caret-up" /></button>
                  </div>
                  <hr/>
                  { post.id && <Comments postId={ post.id } /> }
                </React.Fragment>                
              }
            </div>
            <div className="col-sm-3 col-sm-offset-1 blog-sidebar">
              <Categories/>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

function mapStateToProps ({ singlePostReducer }) {
  // console.log(postsReducer)
  return {
    post: singlePostReducer.item,
    loading: singlePostReducer.loading,
    error: singlePostReducer.error
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostById: (postId) => dispatch(fetchPostById(postId)),
    votePost: (postId, vote) => dispatch(votePost(postId, vote))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Post);
import React from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/PostsActions'

class Posts extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { error, loading, posts } = this.props;
    console.log('posts', posts)

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
        
      <div className="col-sm-8 blog-main">
        { posts.map(item =>  
          <div className="blog-post" key={item.id}>
            <h2 className="blog-post-title">{item.title}</h2>
            <p className="blog-post-meta">January 1, 2014 by <a>Mark</a></p>

            <p>This blog post shows a few different types of content that's supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>
            <hr/>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps ({ postsReducer }) {

  console.log('postsReducer', postsReducer)

  return {
    posts: postsReducer.items,
    loading: postsReducer.loading,
    error: postsReducer.error
  }
}

export default connect( mapStateToProps )(Posts);
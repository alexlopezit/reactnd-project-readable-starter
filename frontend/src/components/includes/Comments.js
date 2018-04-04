import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchComments } from '../../actions'

import Loading from './Loading'

class Comments extends React.Component {

  static propTypes = {
    postId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired
  }

  componentWillMount() {
    this.props.fetchComments( this.props.postId )
  }

  render() {
    const { comments, error, loading } = this.props

    if (error) { return <div>Error! {error.message}</div>; }

    if (loading) { return <Loading />}

    return (
      <React.Fragment>
        <ul className="nav nav-tabs">
          <li className="active"><a>Comments</a></li>
          <li><a>Add Comment</a></li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane active">
            { comments.map(item =>
              <div className="well well-lg" key={item.id}>
                <h4 className="media-heading text-uppercase reviews">{item.author}</h4>
                <p>{item.body}</p>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps ({ commentsReducer }) {
  // console.log(commentsReducer)
  return {
    comments: commentsReducer.items,
    loading: commentsReducer.loading,
    error: commentsReducer.error
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchComments: (postId) => dispatch(fetchComments(postId)),
    // addComment: (data) => dispatch(addComment(data))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Comments);
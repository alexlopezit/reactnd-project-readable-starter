import axios from 'axios'

import { API_ENDPOINT, HEADERS, AUTH_TOKEN } from '../utils/config'
import { handleErrors, guid } from '../utils/helpers'

axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

// Comments list
export const FETCH_COMMENTS_BEGIN = 'FETCH_COMMENTS_BEGIN'
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS'
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE'

// Post comment
export const POST_COMMENT_BEGIN = 'POST_COMMENT_BEGIN'
export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS'
export const POST_COMMENT_FAILURE = 'POST_COMMENT_FAILURE'

export const fetchCommentsBegin = () => ({
  type: FETCH_COMMENTS_BEGIN
});

export const fetchCommentsSuccess = comments => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: { comments }
});

export const fetchCommentsFailure = error => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: { error }
});

export function fetchComments(postId: string) {
  return dispatch => {
    dispatch(fetchCommentsBegin());
    return fetch( `${API_ENDPOINT}/posts/${postId}/comments`, { headers: HEADERS })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchCommentsSuccess(json))
        return json
      })
      .catch(error => dispatch(fetchCommentsFailure(error)))
  };
}

export const postCommentBegin = () => ({
  type: POST_COMMENT_BEGIN
});

export const postCommentSuccess = comments => ({
  type: POST_COMMENT_SUCCESS,
  payload: { comments }
});

export const postCommentFailure = error => ({
  type: POST_COMMENT_FAILURE,
  payload: { error }
});

// export function postComments(postId: string) {
//   return dispatch => {
//     dispatch(postCommentBegin());
//     return fetch( `${API_ENDPOINT}/comments`, { headers: HEADERS })
//       .then(handleErrors)
//       .then(res => res.json())
//       .then(json => {
//         dispatch(postCommentSuccess(json));
//         return json;
//       })
//       .catch(error => dispatch(postCommentFailure(error)));
//   };
// }

export function postComment(values, parentId, callback) {
  const { body, author } = values

  const data = {
      id: guid(),
      parentId,
      timestamp: Date.now(),
      body,
      author
  }
      
  return dispatch => {
    dispatch(postCommentBegin());
    axios.post(`${API_ENDPOINT}/comments`, data)
    .then(handleErrors)
      .then(json => {
        callback()
        // dispatch({ type: CREATE_COMMENT_POST, payload: res.data });
        dispatch(postCommentSuccess(json))
      })
      .catch(error => dispatch(postCommentFailure(error)));
  }
}
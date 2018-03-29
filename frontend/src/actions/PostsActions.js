const API_ENDPOINT = 'http://localhost:3001'
const APP_KEY = 'whatever-you-want'

export const FETCH_POSTS_BEGIN = 'FETCH_POSTS_BEGIN';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const fetchPostsBegin = () => ({
  type: FETCH_POSTS_BEGIN
});

export const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts }
});

export const fetchPostsFailure = error => ({
  type: FETCH_POSTS_FAILURE,
  payload: { error }
});

export function fetchPosts() {
  return dispatch => {
    dispatch(fetchPostsBegin());
    return fetch( API_ENDPOINT + '/posts',{ headers: { 'Authorization': APP_KEY }})
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        console.log('json', json);
        dispatch(fetchPostsSuccess(json.posts));
        return json.posts;
      })
      .catch(error => dispatch(fetchPostsFailure(error)));
  };
}

// Duplicated
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
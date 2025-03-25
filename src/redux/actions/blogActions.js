import axios from 'axios';

import {
  ADD_BLOG,
  GET_BLOGS,
  GET_BLOG,
  DELETE_BLOG
} from './types';

// Get BLOGs
export const getBlogs = () => dispatch => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/blog`)
    .then(res => {
      dispatch({
        type: GET_BLOGS,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_BLOGS,
        payload: []
      })
    );
};

// Get a blog
export const getBlog = (blogId) => dispatch => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/blog/${blogId}`)
    .then(res => {
      dispatch({
        type: GET_BLOG,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_BLOG,
        payload: {}
      })
    );
};

// Delete a blog
export const deleteBlog = (blogId) => dispatch => {
  axios
    .delete(`${process.env.REACT_APP_API_URL}/api/blog/${blogId}`)
    .then(res => {
      dispatch({
        type: DELETE_BLOG,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
    });
};
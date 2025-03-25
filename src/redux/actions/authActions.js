import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

import { SET_USER_DATA, SET_USER_EMAIL, LOGOUT_USER } from './types';

export const setUserEmail = (email) => dispatch => {
  dispatch({
    type: SET_USER_EMAIL,
    payload: email,
  })
}

export const registerUser = (userData, toast, navigate) => dispatch => {
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/user`, userData)
    .then(res => {
      toast('Signup Successed!', { position: "top-center", autoClose: 1000 })
      navigate('/auth')
    })
    .catch(err => {
      toast.error(err.response.data.error);
    });
}

export const getUserData = (email, toast, navigate) => dispatch => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/user/${email}`)
    .then(res => {
      dispatch({
        type: SET_USER_DATA,
        payload: res.data
      })
      navigate('/')
    })
    .catch(err => {
      toast.error(err.response ? err.response.data.error : err.message);
    });
}

export const loginWithToken = (token) => dispatch => {
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/user/verify_token`, { token })
    .then(res => {
      dispatch({
        type: SET_USER_DATA,
        payload: res.data
      })
      setAuthToken(token)
      if (window.location.pathname.startsWith('/auth'))
        window.location.assign("/")
    })
    .catch(err => {
      if (window.location.pathname.startsWith('/auth') == false)
        window.location.assign("/auth")
    });
}

export const updateUser = (userData, toast) => dispatch => {
  axios.put(`${process.env.REACT_APP_API_URL}/api/user`, userData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => {
    console.log(res.data);
    dispatch({
      type: SET_USER_DATA,
      payload: res.data
    });
    toast.success('Profile updated successfully!', {position: 'top-center'});
  }).catch(err => {
    toast.error(err.response.data.error)
  })
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('token');
  setAuthToken(false);
  dispatch({
    type: LOGOUT_USER,
  });
};

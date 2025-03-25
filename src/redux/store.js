import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import blogReducer from './reducers/blogReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer
  }
})

export default store;
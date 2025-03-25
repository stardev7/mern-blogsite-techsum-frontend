import { GET_BLOGS, ADD_BLOG, DELETE_BLOG, GET_BLOG } from '../actions/types';

const initialState = {
    blogs: [],
    currentBlog: {},
};

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BLOGS:
            return {
                ...state,
                blogs: action.payload,
            }
        case GET_BLOG:
            return {
                ...state,
                currentBlog: action.payload,
            }
        case ADD_BLOG:
            return {
                ...state,
                blogs: state.blogs.push(action.payload)
            }
        case DELETE_BLOG:
            return {
                ...state,
                blogs: state.blogs.filter(blog => blog.id !== action.payload.id)
            }
        default:
            return state;
    }
}

export default blogReducer;
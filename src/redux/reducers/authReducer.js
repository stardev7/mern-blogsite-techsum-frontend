import isEmpty from '../../utils/is-empty';

import { LOGOUT_USER, SET_USER_DATA, SET_USER_EMAIL } from '../actions/types';

const initialState = {
  email: "",
  user: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_EMAIL:
      return {
        ...state,
        email: action.payload,
      }
    case SET_USER_DATA:
      return {
        ...state,
        email: action.payload.email,
        user: action.payload,
      }
    case LOGOUT_USER:
      return {
        ...state,
        email: "",
        user: {},
      }
    default:
      return state;
  }
}

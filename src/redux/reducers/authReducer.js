import isEmpty from '../../utils/is-empty';

import { SET_CURRENT_USER, SET_USER_EMAIL } from '../actions/types';

const initialState = {
  email: "",
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_EMAIL:
      alert("OK!"+action.payload);
      return {
        ...state,
        email: action.payload,
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}

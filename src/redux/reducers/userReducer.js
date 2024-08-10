import { FETCH_USER_LOGIN_SUCCESS, UPDATE_USER_SUCCESS, USER_LOGOUT_SUCCESS } from "../actions/useAction";

// src/reducers/counterReducer.js
const initialState = {
  account: {
    email: '',
    access_token: '',
    refresh_token: '',
    username: '',
    image: '',
    role: ''
  },
  isAuthenticated: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      console.log('check: ', action);
      return {
        ...state,
        account: {
          email: action?.payload?.DT?.email,
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          username: action?.payload?.DT?.username,
          image: action?.payload?.DT?.image,
          role: action?.payload?.DT?.role
        },
        isAuthenticated: true
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        account: {
          email: '',
          access_token: '',
          refresh_token: '',
          username: '',
          image: '',
          role: ''
        },
        isAuthenticated: false
      };
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          account: {
            ...state.account,
            username: action?.payload?.username,
            image:action?.payload?.image,
          },
          isAuthenticated: true
        };
    default:
      return state;
  }
};

export default userReducer;

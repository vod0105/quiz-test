import { FETCH_USER_LOGIN_SUCCESS } from "../actions/useAction";

// src/reducers/counterReducer.js
const initialState = {
  account: {
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
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          username: action?.payload?.DT?.username,
          image: action?.payload?.DT?.image,
          role: action?.payload?.DT?.role
        },
        isAuthenticated:true
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
};

export default userReducer;

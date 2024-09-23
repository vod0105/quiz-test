// src/reducers/index.js
import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReducer';
import storesReducer from './storesReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  stores: storesReducer
});
  
export default rootReducer;

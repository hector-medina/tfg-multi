import { combineReducers } from 'redux';
import authReducer from './authReducer';
import idReducer from './idReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: idReducer,
});

export default rootReducer;

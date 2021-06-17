import { combineReducers } from 'redux';
import auth from './auth/Auth.reducer'

export const rootReducer = combineReducers({
  auth
});

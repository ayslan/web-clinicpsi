import { combineReducers } from 'redux';
import auth from './auth/Auth.reducer'
import client from './client/Client.reducer';

export const rootReducer = combineReducers({
  auth,
  client
});

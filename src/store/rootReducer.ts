import { combineReducers } from 'redux';
import auth from './auth/Auth.reducer'
import client from './client/Client.reducer';
import config from './config/Config.reducer';
import system from './system/System.reducer';

export const rootReducer = combineReducers({
  auth,
  client,
  config,
  system
});

import { combineReducers } from 'redux';
import auth from './auth/Auth.reducer'
import client from './client/Client.reducer';
import config from './config/Config.reducer';
import system from './system/System.reducer';
import anamnesis from './anamnesis/Anamnesis.reducer';

export const rootReducer = combineReducers({
  auth,
  client,
  config,
  system,
  anamnesis
});

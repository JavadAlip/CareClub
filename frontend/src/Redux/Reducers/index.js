// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
// Import other reducers if you have

const rootReducer = combineReducers({
  events: eventReducer,
  // Other reducers
});

export default rootReducer;

import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import adminReducer from '../../Redux/Reducers/adminReducer';
// Import other reducers if you have

const rootReducer = combineReducers({
  events: eventReducer,
  admin: adminReducer
  // Other reducers
});

export default rootReducer;

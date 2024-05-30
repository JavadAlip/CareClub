import { combineReducers } from 'redux';
import eventReducer from './../Redux/Reducers/eventReducer'; // Import other reducers if needed
import adminReducer from './../Redux/Reducers/adminReducer';

const rootReducer = combineReducers({
  events: eventReducer,
  admin: adminReducer, // Assuming 'admin' is the key for adminReducer
  // Other reducers if any
});

export default rootReducer;

// src/redux/store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // If you're using Redux Thunk for async actions
import rootReducer from './Reducers';

const store = createStore(rootReducer, applyMiddleware(thunk)); // Apply middleware if needed

export default store;

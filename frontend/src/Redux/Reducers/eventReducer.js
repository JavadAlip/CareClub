// Redux/Reducers/eventReducer.js
import {
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
} from '../Actions/eventActions';

const initialState = {
  loading: false,
  events: [],
  error: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT_REQUEST:
    case FETCH_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: [...state.events, action.payload],
      };
    case ADD_EVENT_FAILURE:
    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    default:
      return state;
  }
};

export default eventReducer;

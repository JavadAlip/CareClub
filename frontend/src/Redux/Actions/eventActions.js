// Redux/Actions/eventActions.js
import axios from 'axios';

export const ADD_EVENT_REQUEST = 'ADD_EVENT_REQUEST';
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
export const ADD_EVENT_FAILURE = 'ADD_EVENT_FAILURE';
export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

export const addEvent = (eventData) => async (dispatch) => {
  dispatch({ type: ADD_EVENT_REQUEST });
  try {
    const response = await axios.post('http://localhost:5000/api/event/events', eventData);
    dispatch({ type: ADD_EVENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADD_EVENT_FAILURE, error: error.message });
  }
};

export const fetchEvents = () => async (dispatch) => {
  console.log('Fetching events...');
  dispatch({ type: FETCH_EVENTS_REQUEST });
  try {
    const response = await axios.get('http://localhost:5000/api/event/events');
    console.log('Events data:', response.data);
    dispatch({ type: FETCH_EVENTS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching events:', error.message);
    dispatch({ type: FETCH_EVENTS_FAILURE, error: error.message });
  }
};

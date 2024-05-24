// actions/eventActions.js
import axios from 'axios';

export const fetchEvents = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/events');
    dispatch({ type: 'FETCH_EVENTS', payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const addEvent = (event) => async (dispatch) => {
  try {
    const response = await axios.post('/api/events', event);
    dispatch({ type: 'ADD_EVENT', payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

//in future Add more actions for updating and deleting events

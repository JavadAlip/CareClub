import axios from 'axios';

export const adminLogin = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('/api/admin/login', credentials);
    dispatch({ type: 'ADMIN_LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'ADMIN_LOGIN_FAILURE', payload: error.response.data });
  }
};

// ...event actions (fetchEvents, addEvent, etc.)
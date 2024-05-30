import axios from 'axios';

export const adminLogin = (credentials) => async (dispatch) => {
  try {
    // Mock API call, replace with real API call
    const response = await axios.post('/api/admin/login', credentials);
    dispatch({ type: 'ADMIN_LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'ADMIN_LOGIN_FAIL', payload: error.message });
  }
};

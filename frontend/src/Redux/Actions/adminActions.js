
// import axios from 'axios';

// export const adminLogin = (credentials) => async (dispatch) => {
//   try {
//     const response = await axios.post('http://localhost:5000/api/admin/login', credentials);
//     dispatch({ type: 'ADMIN_LOGIN_SUCCESS', payload: response.data });
//   } catch (error) {
//     dispatch({ type: 'ADMIN_LOGIN_FAIL', payload: error.message });
//   }
// };

import axios from 'axios';

export const adminLogin = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/admin/login', credentials);
    dispatch({ type: 'ADMIN_LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'ADMIN_LOGIN_FAILURE', payload: error.response.data.message });
    throw new Error(error.response.data.message);  // Ensure error is propagated
  }
};


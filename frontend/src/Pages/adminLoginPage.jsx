import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../Redux/Actions/adminActions';
import AdminDashboard from '../Pages/adminDashBoard';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(adminLogin({ username, password }));
      setIsAuthenticated(true);
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        // If the error has a response object, it means it's a server error
        setError('Login failed. Please check your username and password.');
      } else {
        // Otherwise, it's likely a network error
        setError('Network error. Please check your internet connection.');
      }
    }
  };
  

  // If the admin is authenticated, render the AdminDashboard
  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  return (
    <div className="login-form bg-red-500" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="bg-yellow-300 px-4 py-2 rounded-md mb-4"
          style={{ width: '100%' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-yellow-300 px-4 py-2 rounded-md mb-4"
          style={{ width: '100%' }}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
        {error && <div className="text-white mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default AdminLogin;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../Redux/Actions/adminActions';
import AdminDashboard from '../Components/Admin/AdminDashboard';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const adminLoginState = useSelector(state => state.admin);
  const { isAuthenticated, error } = adminLoginState;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(adminLogin({ username, password }));
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
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
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default AdminLogin;

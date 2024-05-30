import React from 'react';
import { Routes, Route } from 'react-router-dom'; 

// user
import Home from '../Pages/Home';
import Event from '../Pages/EventPage';

// Admin
import AdminLogin from '../Pages/adminLoginPage';
import AdminDashboard from '../Components/Admin/AdminDashboard';
import EventList from '../Components/Admin/AdminEventForm';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/event' element={<Event />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/eventlist" element={<EventList />} />
    </Routes>
  );
};

export default Routers;

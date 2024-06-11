// import React from 'react';
// import { Routes, Route } from 'react-router-dom'; 

// // user
// import Home from '../Pages/Home';
// import Event from '../Pages/EventPage';
// import About from '../Components/About/AboutMore';
// import Contact from '../Pages/Contact';


// // Admin
// import AdminLogin from '../Pages/adminLoginPage';
// import AdminDashboard from '../Pages/adminDashBoard';
// import EventList from '../Components/Admin/AdminEventForm';

// const Routers = () => {
//   return (
//     <Routes>
//       <Route path='/' element={<Home />} />
//       <Route path='/events' element={<Event />} />
//       <Route path='/about' element={<About />} />
//       <Route path='/contact' element={<Contact />} />

//       <Route path="/admin/login" element={<AdminLogin />} />
//       <Route path="/admin/dashboard" element={<AdminDashboard />} />
//       <Route path="/admin/eventlist" element={<EventList />} />
//     </Routes>
//   );
// };

// export default Routers;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// User
import Home from '../Pages/Home';
import Event from '../Pages/EventPage';
import About from '../Components/About/AboutMore';
import Contact from '../Pages/Contact';

// Admin
import AdminLogin from '../Pages/adminLoginPage';
import AdminDashboard from '../Pages/adminDashBoard';
import EventList from '../Components/Admin/AdminEventForm';

// Private Route
import PrivateRoute from '../Components/Admin/PrivateRoute';

const Routers = () => {
  const isAuthenticated = useSelector(state => state.admin.isAuthenticated);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/events' element={<Event />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminDashboard />} />} />
      <Route path="/admin/eventlist" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<EventList />} />} />
    </Routes>
  );
};

export default Routers;

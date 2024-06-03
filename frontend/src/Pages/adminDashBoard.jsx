import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchEvents } from './../Redux/Actions/eventActions';
import AdminEventList from '../Components/Events/adminEventList';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('events');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', fontFamily: 'Arial, sans-serif', marginTop: '120px' }}>
      <div className="admin-dashboard" style={{ width: '80%', maxHeight: '90vh', backgroundColor: '#000000', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          {/* Sidebar */}
          <div
            className="sidebar"
            style={{
              width: '250px',
              backgroundColor: '#2c3e50',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '8px 0 0 8px',
            }}
          >
            <div style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>CareClub Admin</div>
            <ul style={{ listStyleType: 'none', padding: 0, width: '100%' }}>
              <li
                onClick={() => setActiveSection('events')}
                style={{ padding: '10px 20px', cursor: 'pointer', borderBottom: '1px solid #34495e' }}
              >
                Events
              </li>
              <li
                onClick={() => setActiveSection('premiumUsers')}
                style={{ padding: '10px 20px', cursor: 'pointer', borderBottom: '1px solid #34495e' }}
              >
                Premium Users
              </li>
            </ul>
          </div>

          {/* Content Area */}
          <div className="content" style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            {activeSection === 'events' && <AdminEventList />}
            {activeSection === 'premiumUsers' && <div>Premium Users Content</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

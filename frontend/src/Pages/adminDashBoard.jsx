import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchEvents } from './../Redux/Actions/eventActions';
import AdminEventList from '../Components/Events/adminEventList';
import Volunteer from '../Components/Volunteer/Volunteer';
import Donor from '../Components/Donors/Donors';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('events');
  const [volunteers, setVolunteers] = useState([]);
  const [donors, setDonors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/volunteers');
      setVolunteers(response.data);
    } catch (error) {
      console.error('Error fetching volunteers', error);
    }
  };

  const fetchDonors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/donations');
      setDonors(response.data);
    } catch (error) {
      console.error('Error fetching donors', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', fontFamily: 'Arial, sans-serif', marginTop: '120px' }}>
      <div className="admin-dashboard" style={{ width: '80%', maxHeight: '90vh', backgroundColor: '#038112', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="sidebar" style={{ width: '250px', backgroundColor: '#7fad80', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '8px 0 0 8px' }}>
            <div style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>CareClub Admin</div>
            <ul style={{ listStyleType: 'none', padding: 0, width: '100%' }}>
              <li onClick={() => setActiveSection('events')} style={{ padding: '10px 20px', cursor: 'pointer', borderBottom: '1px solid #34495e' }}>Events</li>
              <li onClick={() => setActiveSection('volunteer')} style={{ padding: '10px 20px', cursor: 'pointer', borderBottom: '1px solid #34495e' }}>Volunteers</li>
              <li onClick={() => setActiveSection('donors')} style={{ padding: '10px 20px', cursor: 'pointer', borderBottom: '1px solid #34495e' }}>Donors</li>
            </ul>
          </div>
          <div className="content" style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            {activeSection === 'events' && <AdminEventList />}
            {activeSection === 'volunteer' && <Volunteer volunteers={volunteers} />}
            {activeSection === 'donors' && <Donor donors={donors} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent, fetchEvents } from './../Redux/Actions/eventActions';

const AdminDashboard = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const eventsState = useSelector((state) => state.events);
  const { events, loading, error } = eventsState || { events: [], loading: false, error: null };
  console.log(events)

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEvent({ title, description, date, imageUrl }));
    setTitle('');
    setDescription('');
    setDate('');
    setImageUrl('');
    setShowEventForm(false);
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div className="admin-dashboard" style={{ width: '80%', maxHeight: '90vh', backgroundColor: '#ecf0f1', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'flex' }}>
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
            <div style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>Spur</div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: 'none' }}
            />
            <ul style={{ listStyleType: 'none', padding: 0, width: '100%' }}>
              <li
                onClick={() => setShowEventForm(false)}
                style={{ padding: '10px 20px', cursor: 'pointer', borderBottom: '1px solid #34495e' }}
              >
                Events
              </li>
              <li
                onClick={() => setShowEventForm(false)}
                style={{ padding: '10px 20px', cursor: 'pointer', borderBottom: '1px solid #34495e' }}
              >
                Premium Users
              </li>
            </ul>
          </div>

          {/* Content Area */}
          <div className="content" style={{ flex: 1, padding: '20px' }}>
            {loading ? (
              <p>Loading events...</p>
            ) : error ? (
              <p>Error loading events: {error}</p>
            ) : showEventForm ? (
              // Event Form
              <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px' }}>
                <h1>Add New Event</h1>
                <input
                  type="text"
                  placeholder="Event Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <textarea
                  placeholder="Event Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px' }}>Add Event</button>
              </form>
            ) : (
              // Event List
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px' }}>
                <h1>Events</h1>
                {filteredEvents.length === 0 ? (
                  <p>No events available.</p>
                ) : (
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {filteredEvents.map((event) => (
                      <li key={event._id} style={{ marginBottom: '10px' }}>
                        <img src={event.imageUrl} alt={event.title} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                        <p>{new Date(event.date).toLocaleDateString()}</p>
                      </li>
                    ))}
                  </ul>
                )}
                <button onClick={() => setShowEventForm(true)} style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px' }}>Create New Event</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

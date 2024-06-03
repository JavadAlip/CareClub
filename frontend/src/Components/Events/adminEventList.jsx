import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent, deleteEvent } from './../../Redux/Actions/eventActions';
import { FaTrash } from 'react-icons/fa'; 

const AdminEventList = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;
  const dispatch = useDispatch();

  const eventsState = useSelector((state) => state.events);
  const { events, loading, error } = eventsState || { events: [], loading: false, error: null };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEvent({ title, description, date, imageUrl }));
    setTitle('');
    setDescription('');
    setDate('');
    setImageUrl('');
    setShowEventForm(false);
  };

  const handleDelete = (eventId, eventTitle) => {
    if (window.confirm(`Are you sure you want to delete the event "${eventTitle}"?`)) {
      dispatch(deleteEvent(eventId));
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px', maxHeight: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '300px', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          onClick={() => setShowEventForm(true)}
          style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Create New Event
        </button>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p>Error loading events: {error}</p>
      ) : showEventForm ? (
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
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px' }}>
            Add Event
          </button>
        </form>
      ) : (
        <div>
          <h1>Events</h1>
          {filteredEvents.length === 0 ? (
            <p>No events available.</p>
          ) : (
            <div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Image</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEvents.map((event) => (
                    <tr key={event.id}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{truncateText(event.title, 5)}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{truncateText(event.description, 5)}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(event.date).toLocaleDateString()}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                        <img src={event.imageUrl} alt={event.title} style={{ maxWidth: '100px' }} />
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                        <button
                          onClick={() => handleDelete(event._id, event.title)} // Pass event ID and title to the delete function
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'red',
                            cursor: 'pointer',
                          }}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
               {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handleClick(index + 1)}
                    style={{
                      padding: '10px 20px',
                      margin: '0 5px',
                      backgroundColor: currentPage === index + 1 ? '#3498db' : '#ecf0f1',
                      color: currentPage === index + 1 ? 'white' : 'black',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );    
};

export default AdminEventList;

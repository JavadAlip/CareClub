import React from 'react';

const EventList = ({ events }) => {
  // Function to chunk the events array into groups of three
  const chunkEvents = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
      arr.slice(index * size, index * size + size)
    );

  // Group events into rows
  const rows = chunkEvents(events, 3);

  // Placeholder image URL
  const placeholderImage = 'https://via.placeholder.com/150';

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2em', marginBottom: '20px' }}>Upcoming Events</h2>
      {/* Map through rows */}
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          {/* Map through events in each row */}
          {row.map((event) => (
            <div key={event._id} style={{ flex: 1, background: '#f8f8f8', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden', margin: '0 10px', transition: 'transform 0.3s', ':hover': { transform: 'scale(1.05)' } }}>
              <img
                src={event.imageUrl || placeholderImage}
                alt={event.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px' }}>
                <h3 style={{ fontSize: '1.5em', marginBottom: '10px' }}>{event.title}</h3>
                <p style={{ fontSize: '1em', marginBottom: '10px' }}>{event.description}</p>
                <p style={{ fontSize: '0.9em', color: '#555' }}>{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EventList;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../Redux/Actions/eventActions';

const EventList = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Ensure events is an array before mapping over it
  if (!events) {
    return <p>Loading events...</p>;
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <div key={event._id} className="event-card">
          <img src={event.imageUrl} alt={event.title} />
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>{new Date(event.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;

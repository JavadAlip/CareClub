// Pages/EventPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventList from '../Components/Events/EventList';
import { fetchEvents } from '../Redux/Actions/eventActions';

const EventPage = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events) || { events: [], loading: true, error: null };
  console.log("heelooo", events)
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>Error loading events: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold my-4">Upcoming Events</h1>
      <EventList events={events} />
    </div>
  );
};

export default EventPage;

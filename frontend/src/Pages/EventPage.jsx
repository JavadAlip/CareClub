import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../Redux/Actions/eventActions';
import EventList from '../Components/Events/EventList';

const EventPage = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-3xl font-bold my-4">Upcoming Events</h1>
      <EventList events={events} />
    </div>
  );
};

export default EventPage;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../Redux/Actions/eventActions';

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEvent({ title, description, date, imageUrl }));
    setTitle('');
    setDescription('');
    setDate('');
    setImageUrl('');
  };

  return (
    <div className="admin-dashboard">
      <h1>Add New Event</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AdminDashboard;

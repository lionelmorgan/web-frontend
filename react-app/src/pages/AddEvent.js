import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddEvent() {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('event_name', eventName);

      // Create a date object from the input
      const date = new Date(eventDate);
      // Format to a specific pattern
      const isoDate = date.toISOString().split('.')[0]; // '2024-11-03T13:48:59'

      formData.append('event_date', isoDate);
      formData.append('location', location);
      formData.append('description', description);
      formData.append('image', image);

      const response = await fetch('http://localhost:9000/api/events/addEvent', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Event added successfully');
        navigate('/events');
      } else {
        console.error('Failed to add event');
        setErrorMessage('Failed to add event. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage)); // Create a preview URL
    }
  };

  return (
    <div className="event-container">
      <form onSubmit={handleFormSubmit} className="event-form">
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <div className="event">
          {imagePreview && (
            <img className="img-fluid mb-3" src={imagePreview} alt="Uploaded" />
          )}
          <div className="event-body">
            <div className="mb-3">
              <input
                type="text"
                id="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
                className="form-control"
                placeholder="Event Name"
              />
            </div>
            <div className="mb-3">
              <input
                type="datetime-local"
                id="eventDate"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
                className="form-control"
                placeholder="Event Date"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="form-control"
                placeholder="Location"
              />
            </div>
            <div className="mb-3">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="form-control"
                placeholder="Description"
              />
            </div>
            <div className="mb-3">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="form-control"
                placeholder="Image"
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Event</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;

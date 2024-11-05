import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './EventPost.css'; // Import your CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

function AddEvent() {
  const handleRedirectToAddEvent = () => {
    window.location.href = '/addEvent'; // Redirect to the AddEvent page
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleRedirectToAddEvent}>
        Add Event
      </button>
    </div>
  );
}

export default AddEvent;

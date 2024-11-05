// Bread.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Bread = () => {
  return (
    <nav aria-label="breadcrumb" style={{ background: 'grey' }}>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/home">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/events">Events</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Add Event
        </li>
      </ol>
    </nav>
  );
};

export default Bread;

import React from 'react';
import './EventsList.css'; 

const EventsList = () => {
  return (
    <div className="image-icons-container">
      <div className="image-icon"><img src={require('../images/ironman.jpg')} alt="Icon 1" /></div>
      <div className="image-icon"><img src={require('../images/hulk.png')} alt="Icon 2" /></div>
      <div className="image-icon"><img src={require('../images/blackpanther.png')} alt="Icon 3" /></div>
      <div className="image-icon"><img src={require('../images/drstrange.jpg')} alt="Icon 4" /></div>
      <div className="image-icon"><img src={require('../images/blackwidow.jpg')} alt="Icon 6" /></div>
      <div className="image-icon"><img src={require('../images/spiderman.jpg')} alt="Icon 7" /></div>
    </div>
  );
};

export default EventsList;
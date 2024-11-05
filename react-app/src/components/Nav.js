// Navbar.js
import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt, faCalendar, faGlobe } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ username }) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownClose = () => {
    setDropdownVisible(false);
  };

  return (
    <nav className="navbar-spider">
      <div className="navbar-brand-spider">
        <span id="nav-title"><b>SPIDER</b>WEB</span>
      </div>
      <div className="navbar-toggle">
        <span>{username}</span>
        <img
          className="img-nav"
          src={require('../images/ironpanther.png')}
          alt="User"
          onClick={toggleDropdown}
        />
        <div className={dropdownVisible ? 'dropdown-menu show' : 'dropdown-menu'}>
        <Link to="/events" onClick={handleDropdownClose}>
            <FontAwesomeIcon icon={faCalendar} /> Events
          </Link>
          <Link to="/home" onClick={handleDropdownClose}>
            <FontAwesomeIcon icon={faGlobe} /> Feed
          </Link>
          <Link to="/profile" onClick={handleDropdownClose}>
            <FontAwesomeIcon icon={faUser} /> Profile
          </Link>
          <Link to="/settings" onClick={handleDropdownClose}>
            <FontAwesomeIcon icon={faCog} /> Settings
          </Link>
          <Link to="/login" onClick={handleDropdownClose}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

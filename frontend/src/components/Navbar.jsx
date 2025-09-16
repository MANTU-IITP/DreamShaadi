import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ user = null }) => {
  const [cityInput, setCityInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      window.location.href = `/vendors.html?city=${encodeURIComponent(cityInput.trim())}`;
    }
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <a href="/">VibeVista</a>
        </div>

        <form className="city-search" onSubmit={handleSearch}>
          <input 
            type="text" 
            id="city-input" 
            placeholder="Search by city..." 
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
          />
          <button type="submit" id="city-search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </form>

        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/vendors/wedding-venues">Venues</a></li>
          <li><a href="/photographers">Photographers</a></li>
          
          {!user ? (
            <>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Signup</a></li>
            </>
          ) : (
            <li><a href="/logout">Logout</a></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;




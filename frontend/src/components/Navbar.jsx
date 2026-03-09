import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cityInput, setCityInput] = useState('');
  const [user, setUser] = useState(null); // store logged-in user
  const navigate = useNavigate();

  // Check localStorage for logged-in user on component mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // parse in case you stored as JSON
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Do you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      setUser(null);
      navigate("/login");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      navigate(`/vendors.html?city=${encodeURIComponent(cityInput.trim())}`);
    }
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <a href="/">DreamShaadi</a>
        </div>

       {/* <form className="city-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by city..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
          />
          <button type="submit">
            
          </button>
        </form>  */}

        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/vendor">Vendor</a></li>
          <li><a href="/vendors/wedding-venues">Venues</a></li>
          <li><a href="/photographers">Photographers</a></li>

          {user ? (
            <>
              <li>Hi, {user}</li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Signup</a></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;



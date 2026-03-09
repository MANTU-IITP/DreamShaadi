import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  const handleLogout = () => {
    if (!window.confirm("Do you want to logout?")) return;
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedInEmail");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("role");
    localStorage.removeItem("vendorProfile");
    setUser(null);
    setIsAdmin(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchInput.trim();
    if (!q) {
      navigate("/vendor");
      return;
    }
    navigate(`/vendor?q=${encodeURIComponent(q)}`);
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/">DreamShaadi</Link>
        </div>

        <form className="city-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search vendors by city, category, or name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/vendor">Vendor</Link>
          </li>
          {isAdmin && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
          {user ? (
            <>
              <li>Hi, {user}</li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

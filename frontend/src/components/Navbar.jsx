import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import NotificationBell from "./NotificationBell";

const categories = [
  "Photographer", "Venue", "Caterer", "Decorator", "Mehendi", "Makeup",
  "Music/DJ", "Pandit", "Choreographer", "Invitation", "Transport", "Honeymoon",
];

const Navbar = () => {
  const { user, isLoggedIn, isAdmin, isVendor, logout } = useAuth();
  const { ids } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const heroMode = location.pathname === "/" && !scrolled;
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className={`site-navbar ${heroMode ? "navbar-hero" : "navbar-solid"}`}>
      <Link to="/" className="brand" aria-label="DreamShaadi home">
        <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 8c2 7 2 12 0 17-2-5-2-10 0-17Zm-12 8c7 2 11 6 12 11-6-1-10-5-12-11Zm24 0c-2 6-6 10-12 11 1-5 5-9 12-11ZM9 29c6-2 11-1 15 3-5 3-11 2-15-3Zm30 0c-4 5-10 6-15 3 4-4 9-5 15-3ZM24 32c4 0 7 2 9 6H15c2-4 5-6 9-6Z"/></svg>
        <span>Dream<span>Shaadi</span></span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <NavLink to="/vendor">Vendors</NavLink>
        <div className="nav-dropdown">
          <button type="button">Categories <span>⌄</span></button>
          <div className="category-menu">
            {categories.map((category) => (
              <Link key={category} to={`/vendor?category=${encodeURIComponent(category)}`}>{category}</Link>
            ))}
          </div>
        </div>
        <a href="/#stories">Stories</a>
        <a href="/#how-it-works">How It Works</a>
      </nav>

      <div className="navbar-actions">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="btn btn-outline nav-login">Login</Link>
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
          </>
        ) : (
          <>
            <NotificationBell />
            {!isVendor && !isAdmin && (
              <Link to="/wishlist" className="wishlist-nav" aria-label="Wishlist">♡ <span>{ids.length}</span></Link>
            )}
            {isVendor && <Link to="/vendor/admin" className="dashboard-link">My Dashboard</Link>}
            {isAdmin && <Link to="/admin" className="dashboard-link">Admin Panel</Link>}
            <div className="profile-menu">
              <button type="button" className="avatar-button" onClick={() => setProfileOpen((value) => !value)}>
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </button>
              {profileOpen && (
                <div className="profile-dropdown">
                  <strong>{user?.name}</strong>
                  <small>{user?.email}</small>
                  {isVendor && <Link to="/vendor/admin">Dashboard</Link>}
                  {!isVendor && !isAdmin && <Link to="/wishlist">My Wishlist</Link>}
                  <button type="button" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </>
        )}
        <button type="button" className="mobile-menu-button" onClick={() => setDrawerOpen(true)} aria-label="Open menu">☰</button>
      </div>

      {drawerOpen && (
        <div className="mobile-drawer-backdrop" onMouseDown={() => setDrawerOpen(false)} role="presentation">
          <aside className="mobile-drawer" onMouseDown={(event) => event.stopPropagation()}>
            <div className="drawer-header">
              <span className="brand">Dream<span>Shaadi</span></span>
              <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close menu">×</button>
            </div>
            <Link to="/vendor">Browse Vendors</Link>
            <Link to="/vendor/explore">Explore</Link>
            {categories.map((category) => (
              <Link key={category} to={`/vendor?category=${encodeURIComponent(category)}`}>{category}</Link>
            ))}
            {!isLoggedIn && <Link to="/login">Login</Link>}
            {!isLoggedIn && <Link to="/signup" className="btn btn-primary">Get Started</Link>}
            {isVendor && <Link to="/vendor/admin">My Dashboard</Link>}
            {isAdmin && <Link to="/admin">Admin Panel</Link>}
            {isLoggedIn && <button type="button" onClick={handleLogout}>Logout</button>}
          </aside>
        </div>
      )}
    </header>
  );
};

export default Navbar;

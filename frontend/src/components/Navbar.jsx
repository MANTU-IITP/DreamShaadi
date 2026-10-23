import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import NotificationBell from "./NotificationBell";
import "./Navbar.css";

const categories = [
  "Photographer",
  "Venue",
  "Caterer",
  "Decorator",
  "Mehendi",
  "Makeup",
  "Music/DJ",
  "Pandit",
  "Choreographer",
  "Invitation",
  "Transport",
  "Honeymoon",
];

const Navbar = () => {
  const { user, isLoggedIn, isAdmin, isVendor, logout } = useAuth();
  const { ids } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  useEffect(() => {
    setDrawerOpen(false);
    setProfileOpen(false);
    setCategoriesOpen(false);
  }, [location.pathname, location.search, location.hash]);
  
  useEffect(() => {
    if (!drawerOpen) return undefined;
    
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [drawerOpen]);
  
  useEffect(() => {
    if (!drawerOpen && !profileOpen && !categoriesOpen) return;
    
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
        setProfileOpen(false);
        setCategoriesOpen(false);
      }
    };
    
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [drawerOpen, profileOpen, categoriesOpen]);
  
  const heroMode = location.pathname === "/" && !scrolled;
  
  const handleLogout = async () => {
    setProfileOpen(false);
    setDrawerOpen(false);
    await logout();
    navigate("/");
  };
  
  const categoryUrl = (category) =>
    `/vendor?category=${encodeURIComponent(category)}`;
  
  return (
    <header
      className={`site-navbar ${
        heroMode ? "navbar-hero" : "navbar-solid"
      } ${scrolled ? "navbar-scrolled" : ""}`}
    >
      <div className="navbar-inner">
        <Link to="/" className="brand" aria-label="DreamShaadi home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="currentColor">
              <path d="M24 5c3 7 3 13 0 19-3-6-3-12 0-19Z" />
              <path d="M10 12c8 2 13 6 15 12-7-1-12-5-15-12Z" />
              <path d="M38 12c-3 7-8 11-15 12 2-6 7-10 15-12Z" />
              <path d="M6 28c7-3 13-2 18 3-6 4-13 3-18-3Z" />
              <path d="M42 28c-5 6-12 7-18 3 5-5 11-6 18-3Z" />
              <path d="M24 31c5 0 9 3 11 8H13c2-5 6-8 11-8Z" />
            </svg>
          </span>
          
          <span className="brand-wordmark">
            Dream<span>Shaadi</span>
            <small>YOUR STORY. YOUR CELEBRATION.</small>
          </span>
        </Link>
        
        <nav className="desktop-nav" aria-label="Primary navigation">
          <NavLink
            to="/vendor"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active" : ""}`
            }
          >
            Find Vendors
          </NavLink>
          
          <div
            className={`nav-dropdown ${
              categoriesOpen ? "nav-dropdown-open" : ""
            }`}
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <button
              type="button"
              className="nav-link nav-dropdown-trigger"
              aria-expanded={categoriesOpen}
              onClick={() => setCategoriesOpen((open) => !open)}
            >
              Categories
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="m4 6 4 4 4-4" />
              </svg>
            </button>
            
            <div className="category-menu">
              <div className="dropdown-heading">
                <span>Make it memorable</span>
                <small>Everything your celebration needs</small>
              </div>
              
              <div className="category-menu-grid">
                {categories.map((category, index) => (
                  <Link
                    key={category}
                    to={categoryUrl(category)}
                    onClick={() => setCategoriesOpen(false)}
                  >
                    <span className="category-menu-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {category}
                    <span className="category-menu-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                ))}
              </div>
              
              <Link
                to="/vendor"
                className="category-menu-footer"
                onClick={() => setCategoriesOpen(false)}
              >
                Explore all vendors <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          
          <NavLink
            to="/stories"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active" : ""}`
            }
          >
            Inspiration
          </NavLink>
          
          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active" : ""}`
            }
          >
            How It Works
          </NavLink>
        </nav>
        
        <div className="navbar-actions">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="nav-login">
                Log in
              </Link>
              <Link to="/signup" className="nav-cta">
                <span>Start Planning</span>
                <span className="nav-cta-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </>
          ) : (
            <>
              <div className="navbar-icon-action">
                <NotificationBell />
              </div>
              
              {!isVendor && !isAdmin && (
                <Link
                  to="/wishlist"
                  className="wishlist-nav"
                  aria-label={`Wishlist, ${ids.length} saved items`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                  </svg>
                  <span className="wishlist-count">{ids.length}</span>
                </Link>
              )}
              
              {isVendor && (
                <Link to="/vendor/admin" className="dashboard-link">
                  Dashboard <span aria-hidden="true">↗</span>
                </Link>
              )}
              
              {isAdmin && (
                <Link to="/admin" className="dashboard-link">
                  Admin Panel <span aria-hidden="true">↗</span>
                </Link>
              )}
              
              <div className="profile-menu">
                <button
                  type="button"
                  className="avatar-button"
                  onClick={() => setProfileOpen((open) => !open)}
                  aria-label="Open account menu"
                  aria-expanded={profileOpen}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  <span className="avatar-status" />
                </button>
                
                {profileOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-dropdown-heading">
                      <span className="profile-avatar">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                      <span className="profile-user-details">
                        <strong>{user?.name || "Welcome"}</strong>
                        <small>{user?.email}</small>
                      </span>
                    </div>
                    
                    <div className="profile-dropdown-divider" />
                    
                    {isVendor && (
                      <Link to="/vendor/admin">
                        <span>My dashboard</span>
                        <span>↗</span>
                      </Link>
                    )}
                    
                    {isAdmin && (
                      <Link to="/admin">
                        <span>Admin panel</span>
                        <span>↗</span>
                      </Link>
                    )}
                    
                    {!isVendor && !isAdmin && (
                      <Link to="/wishlist">
                        <span>My wishlist</span>
                        <span>♡</span>
                      </Link>
                    )}
                    
                    <button
                      type="button"
                      className="profile-logout"
                      onClick={handleLogout}
                    >
                      <span>Log out</span>
                      <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          
          <button
            type="button"
            className={`mobile-menu-button ${
              drawerOpen ? "mobile-menu-button-open" : ""
            }`}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      
      {drawerOpen && (
        <div
          className="mobile-drawer-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDrawerOpen(false);
            }
          }}
        >
          <aside
            className="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="drawer-header">
              <Link to="/" className="brand" aria-label="DreamShaadi home">
                <span className="brand-mark" aria-hidden="true">
                  <svg viewBox="0 0 48 48" fill="currentColor">
                    <path d="M24 5c3 7 3 13 0 19-3-6-3-12 0-19Z" />
                    <path d="M10 12c8 2 13 6 15 12-7-1-12-5-15-12Z" />
                    <path d="M38 12c-3 7-8 11-15 12 2-6 7-10 15-12Z" />
                    <path d="M6 28c7-3 13-2 18 3-6 4-13 3-18-3Z" />
                    <path d="M42 28c-5 6-12 7-18 3 5-5 11-6 18-3Z" />
                    <path d="M24 31c5 0 9 3 11 8H13c2-5 6-8 11-8Z" />
                  </svg>
                </span>
                <span className="brand-wordmark">
                  Dream<span>Shaadi</span>
                  <small>YOUR STORY. YOUR CELEBRATION.</small>
                </span>
              </Link>
              
              <button
                type="button"
                className="drawer-close"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close navigation menu"
              >
                ×
              </button>
            </div>
            
            <div className="drawer-welcome">
              <span className="drawer-eyebrow">YOUR DAY, YOUR WAY</span>
              <h2>
                Your dream
                <br />
                wedding starts here.
              </h2>
            </div>
            
            <nav className="drawer-navigation" aria-label="Mobile navigation">
              <Link to="/vendor">
                <span>01</span> Find Vendors <span>↗</span>
              </Link>
              <Link to="/vendor/explore">
                <span>02</span> Explore <span>↗</span>
              </Link>
              <Link to="/stories">
                <span>03</span> Inspiration <span>↗</span>
              </Link>
              <Link to="/how-it-works">
                <span>04</span> How It Works <span>↗</span>
              </Link>
            </nav>
            
            <details className="drawer-categories">
              <summary>
                Browse Categories <span aria-hidden="true">＋</span>
              </summary>
              <div className="drawer-category-list">
                {categories.map((category) => (
                  <Link key={category} to={categoryUrl(category)}>
                    {category}
                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </details>
            
            {isLoggedIn && (
              <div className="drawer-account">
                <span className="drawer-account-label">YOUR ACCOUNT</span>
                
                {user?.name && <strong>{user.name}</strong>}
                
                {!isVendor && !isAdmin && (
                  <Link to="/wishlist">My Wishlist</Link>
                )}
                {isVendor && <Link to="/vendor/admin">My Dashboard</Link>}
                {isAdmin && <Link to="/admin">Admin Panel</Link>}
                <button type="button" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            )}
            
            {!isLoggedIn && (
              <div className="drawer-auth-actions">
                <Link to="/login" className="drawer-login">
                  Log in to your account
                </Link>
                <Link to="/signup" className="nav-cta drawer-cta">
                  Start Planning <span aria-hidden="true">↗</span>
                </Link>
              </div>
            )}
            
            <div className="drawer-footer">
              <span>Made for your forever moments.</span>
              <span aria-hidden="true">✳</span>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Navbar;

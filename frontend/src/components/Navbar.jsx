import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user session from localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    localStorage.clear();
    setUser(null);
    setIsAdmin(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchInput.trim();
    if (q) navigate(`/vendor?q=${encodeURIComponent(q)}`);
    else navigate("/vendor");
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent hover:from-pink-600 hover:to-pink-800 transition-all"
          >
            DreamShaadi
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <form onSubmit={handleSearch} className="w-full max-w-md">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search vendors by city, category, or name..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-4 pr-10 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-500 hover:text-pink-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-pink-500 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <NavLinks
              user={user}
              isAdmin={isAdmin}
              isActive={isActive}
              handleLogout={handleLogout}
            />
          </div>
        </div>

        {/* Mobile Menu (slide down) */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            menuOpen ? "max-h-96 py-4 border-t border-gray-100" : "max-h-0"
          }`}
        >
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-4 pr-10 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-200 focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
          {/* Mobile Nav Links */}
          <div className="flex flex-col space-y-3">
            <NavLinks
              user={user}
              isAdmin={isAdmin}
              isActive={isActive}
              handleLogout={handleLogout}
              mobile
            />
          </div>
        </div>
      </div>
    </header>
  );
};

// Reusable nav links component (used in both desktop and mobile)
const NavLinks = ({ user, isAdmin, isActive, handleLogout, mobile = false }) => {
  const baseClass = mobile
    ? "block py-2 text-gray-700 hover:text-pink-600 transition-colors"
    : "px-3 py-2 text-gray-700 hover:text-pink-600 transition-colors relative group";

  const activeClass = "text-pink-600 font-medium";

  return (
    <>
      <Link
        to="/"
        className={`${baseClass} ${isActive("/") ? activeClass : ""}`}
      >
        Home
        {!mobile && (
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
        )}
      </Link>
      <Link
        to="/vendor"
        className={`${baseClass} ${isActive("/vendor") ? activeClass : ""}`}
      >
        Vendors
        {!mobile && (
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
        )}
      </Link>
      {isAdmin && (
        <Link
          to="/admin"
          className={`${baseClass} ${isActive("/admin") ? activeClass : ""}`}
        >
          Admin
          {!mobile && (
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
          )}
        </Link>
      )}
      {user ? (
        <>
          <span className={`${mobile ? "block py-2 text-gray-700" : "px-3 py-2"}`}>
            Hi, {user}
          </span>
          <button
            onClick={handleLogout}
            className={`${
              mobile
                ? "block w-full text-left py-2 text-red-600 hover:text-red-700"
                : "px-3 py-2 text-red-600 hover:text-red-700"
            } transition-colors`}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className={`${baseClass} ${isActive("/login") ? activeClass : ""}`}
          >
            Login
            {!mobile && (
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
            )}
          </Link>
          <Link
            to="/signup"
            className={`${baseClass} ${isActive("/signup") ? activeClass : ""}`}
          >
            Signup
            {!mobile && (
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
            )}
          </Link>
        </>
      )}
    </>
  );
};

export default Navbar;
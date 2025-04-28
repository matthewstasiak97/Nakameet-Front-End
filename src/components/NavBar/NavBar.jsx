import { useContext } from "react";
import { Link, useLocation } from "react-router-dom"; // <-- ADD useLocation
import { UserContext } from "../../contexts/UserContext";
import "./NavBar.css";

function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation(); // <-- Grab current route path

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Determine if we're on home ("/") or events ("/events")
  const isHomeOrEvents = location.pathname === "/" || location.pathname === "/events";

  return (
    <nav className="navbar">
      {user ? (
        <ul className="navbar-list">
          <li className="navbar-item welcome-text">Welcome, {user.username}</li>

          {/* Only show Sign Out on Home or Events page */}
          {isHomeOrEvents ? (
            <li className="navbar-item">
              <button onClick={handleSignOut} className="navbar-button btn-signout">
                Sign Out
              </button>
            </li>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/events">
                  <button className="navbar-button btn-events">Events</button>
                </Link>
              </li>
              <li className="navbar-item">
                <button onClick={handleSignOut} className="navbar-button btn-signout">
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
      ) : (
        <ul className="navbar-list">
          <li className="navbar-item">
          </li>
          <li className="navbar-item">
            <Link to="/sign-up">
              <button className="navbar-button btn-signup">Sign Up</button>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/sign-in">
              <button className="navbar-button btn-signin">Sign In</button>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;

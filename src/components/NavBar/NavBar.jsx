import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import "./NavBar.css";

function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      {user ? (
        <ul className="navbar-list">
          <li className="navbar-item welcome-text">Welcome, {user.username}</li>
          <li className="navbar-item">
            Events
            <Link to="/">
              <button className="navbar-button btn-events">Events</button>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/">
              <button
                onClick={handleSignOut}
                className="navbar-button btn-signout"
              >
                Sign Out
              </button>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/events">
              <button className="navbar-button btn-events">Events</button>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/sign-up">
              <button className="navbar-button btn-signup">Sign up</button>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/sign-in">
              <button className="navbar-button btn-signin">Sign in</button>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;

import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <button 
            className="navbar-button btn-events"
            onClick={() => handleClick('/events')}
          >
            Events
          </button>
        </li>
        <li className="navbar-item">
          <button 
            className="navbar-button btn-signup"
            onClick={() => handleClick('/signup')}
          >
            Sign up
          </button>
        </li>
        <li className="navbar-item">
          <button 
            className="navbar-button btn-signin"
            onClick={() => handleClick('/signin')}
          >
            Sign in
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
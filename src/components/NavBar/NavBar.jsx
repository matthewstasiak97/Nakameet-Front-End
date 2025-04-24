import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
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
    </nav>
  );
}

export default NavBar;
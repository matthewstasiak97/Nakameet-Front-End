import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav>
      {user ? (
        <ul>
          <li>Welcome, {user.username}</li>
          <li>
              Events
              <Link to="/">
              <button>Events</button>
              </Link>
          </li>
          <li>
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/events">
              <button>Events</button>
            </Link>
          </li>
          <li>
           
              <Link to="/sign-up">
              <button>Sign up</button>
              </Link>
            
          </li>
          <li>
              <Link to="/sign-in">
              <button>Sign in</button>
              </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;

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
            <button>Events
            <Link to="/"></Link>
            </button>
          </li>
          <li>
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <button>Events
            <Link to="/events"></Link>
            </button>
          </li>
          <li>
            <button>Sign up
            <Link to="/sign-up"></Link>
            </button>
          </li>
          <li>
            <button>Sign In
            <Link to="/sign-in"></Link>
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
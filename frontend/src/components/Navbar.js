import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user, dispatch } = useAuthContext();

  const handleLogout = () => {
    // remove user from local storage
    localStorage.removeItem("user");

    // update auth context
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Travel Experience</h1>
        </Link>
        <nav>
          {user ? (
            <div>
              <span>Welcome, {user.name || user.email}</span>
              <button onClick={handleLogout}>Log Out</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
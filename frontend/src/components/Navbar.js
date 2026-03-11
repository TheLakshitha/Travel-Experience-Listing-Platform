import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

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
              <Link to="/add-listing" style={{ marginLeft: "20px" }}>
                Add Listing
              </Link>
              <button onClick={logout} style={{ marginLeft: "20px" }}>
                Log Out
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login">Log In</Link>
              <Link to="/signup" style={{ marginLeft: "10px" }}>Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
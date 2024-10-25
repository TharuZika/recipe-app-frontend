import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!sessionStorage.getItem('authToken');

  const handleLogout = () => {
    sessionStorage.removeItem('authToken'); 
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">Cook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">Favorites</Link>
            </li>
          </ul>
          <span className="navbar-text">
            {isAuthenticated ? (
              <Link to="/" onClick={handleLogout}>
                <img
                  alt="logout"
                  title="Logout"
                  src="https://cdn-icons-png.flaticon.com/128/1828/1828479.png"
                  width={30}
                />
              </Link>
            ) : (
              <Link to="/login">
                <img
                  alt="login"
                  title="Login"
                  src="https://cdn-icons-png.flaticon.com/128/1828/1828445.png"
                  width={30}
                />
              </Link>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

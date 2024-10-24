import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
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
        <Link className="nav-link" to="/favorites">Favourites</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/categories">Categories</Link>
        </li>
      </ul>
      <span className="navbar-text">
        <Link to="/login"><img title='Logout' src={'https://cdn-icons-png.flaticon.com/128/1828/1828479.png'} width={30}/></Link>
        <Link to="/login"><img title='Login' src={'https://cdn-icons-png.flaticon.com/128/1828/1828445.png'} width={30}/></Link>
      </span>
    </div>
  </div>
</nav>
  );
}

export default Navbar;
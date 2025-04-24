import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/userSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem('userId');
    dispatch(logout()).unwrap().then(() => {
      setIsLoggedIn('false');
      navigate('/login')});
  };

  return (
    <div className="bg-light p-3 d-flex flex-column col-md-4" style={{ minHeight: '100vh', width: '220px' }}>
      <div>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link className="nav-link text-dark" to="/">Home</Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-dark" to="/leadsPage">Leads</Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-dark" to="/agentPage">My Leads</Link>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-dark" href="#">Report</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-dark" href="#">About us</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-dark" href="#">Contact us</a>
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <button className="btn btn-danger w-100" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../slices/userSlice'

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem('userId')
    dispatch(logout()).unwrap().then(() => navigate('/login'))
  }
  return (
    <div className='bg-light d-flex flex-wrap'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary container">
  <div className="container-fluid d-flex justify-content-between">
    <Link className="navbar-brand" to='/'>MyCRMTOOL</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/leadsPage'>Leads</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">About us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Contact us</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div className='d-flex align-items-center mx-2'>
<button className='btn btn-danger' onClick={handleLogout}>Logout</button>
</div>
    </div>
  )
}

export default Navbar

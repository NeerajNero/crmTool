import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'

const ProtectectedRoute = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
  return isLoggedIn === "true" ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectectedRoute

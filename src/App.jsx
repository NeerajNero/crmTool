import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Signup from './pages/Signup';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoutes';
import Navbar from './components/Navbar';
import LeadDetails from './pages/LeadDetails';
import LeadsPage from './pages/LeadsPage';
import AgentViewPage from './pages/AgentViewPage';
import { Toaster } from 'react-hot-toast';
import UpdateLead from './pages/UpdateLead';

function Layout({ children }) {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/signup'];
  const showSidebar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="d-flex">
      {showSidebar && <Navbar />} 
      <div className="flex-grow-1 p-3">{children}</div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));

  return (
    <Router>
      {isLoggedIn === 'true' && (
        <div className="bg-light">
          <div className=" ms-4 py-3">
            <h3>MyCRMTOOL</h3>
          </div>
        </div>
      )}

      <Layout>
        <Routes>
          {/* Public Routes */}
          {isLoggedIn !== 'true' && (
            <>
              <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            </>
          )}

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/leadDetails/:leadId" element={<LeadDetails />} />
            <Route path="/leadsPage" element={<LeadsPage />} />
            <Route path="/agentPage" element={<AgentViewPage />} />
            <Route path="/updateLead" element={<UpdateLead />}/>

            {/* Prevent logged in users from seeing login/signup again */}
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="/login" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Layout>

      <Toaster />
    </Router>
  );
}

export default App;

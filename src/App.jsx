import {BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import ProtectectedRoute from './components/ProtectedRoutes'
import 'bootstrap/dist/js/bootstrap.min.js'
import Navbar from './components/Navbar'
import LeadDetails from './pages/LeadDetails'
import LeadsPage from './pages/LeadsPage'
import { Toaster } from 'react-hot-toast'


function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn')

  const Layout = ({ children }) => {
    const location = useLocation();
    const hideNavbarPaths = ['/login', '/signup'];

    return (
      <>
        {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
        {children}
      </>
    );
  };
  return (
    <>
    <Router>
      <Layout>
      <Routes>
        {isLoggedIn !== "true" && (<>
          <Route path='/signup' element= {<Signup />} />
          <Route path='/login' element= {<Login />} />
        </>)}
        <Route element={<ProtectectedRoute />}>
          <Route path='/' element= {<HomePage />} />
          <Route path='/signup' element= {<Navigate to = '/'/>} />
          <Route path='/login' element= {<Navigate to = '/'/>} />
          <Route path='/leadDetails/:leadId' element={<LeadDetails />} />
          <Route path='/leadsPage' element={<LeadsPage />} />
        </Route>
      </Routes>
      </Layout>
      <Toaster />
    </Router>
    </>
  )
}

export default App

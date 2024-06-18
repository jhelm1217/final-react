import { Link, useLocation  } from "react-router-dom"
import './App.css'

function Header() {

  const location = useLocation();

  if (location.pathname === '/dashboard' ||
    location.pathname === '/get-completed-trips/' ||
    location.pathname === '/get-trips/' ||
    location.pathname === '/create-trip/' ||
    location.pathname === '/update-trip/`${tripId}`/'

  ) {
    return null; // Don't render the header on these pages
  }

  return (
    <div className="nav">
      <Link style={{ marginRight: 20, color: 'white' }} to='/'>Home</Link>
      <Link style={{ marginRight: 20, color: 'white' }} to='create-user/'>New User?</Link>
      <Link style={{ marginRight: 20, color: 'white' }} to='login/'>Login</Link>

    </div>
  )
}

export default Header



// nav style={{ margin: 10, display: 'flex', justifyContent: 'center', fontSize: '20px' }}>
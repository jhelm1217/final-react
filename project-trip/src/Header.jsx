import { Link, useLocation  } from "react-router-dom"

function Header() {

  const location = useLocation();

  if (location.pathname === '/dashboard' ||
    location.pathname === '/get-completed-trips/' ||
    location.pathname === '/get-trips/' ||
    location.pathname === '/create-trip/' ||
    location.pathname === '/get-trips/${id}'
  ) {
    return null; // Don't render the header on the message-list page
  }

  return (
    <div style={{ margin: 10, display: 'flex', justifyContent: 'flex-end', fontSize: '20px' }}>
      <Link style={{ marginRight: 20, color: 'black' }} to='/'>Home</Link>
      <Link style={{ marginRight: 20, color: 'black' }} to='create-user/'>New User?</Link>
      <Link style={{ marginRight: 20, color: 'black' }} to='login/'>Login</Link>


    </div>
  )
}

export default Header
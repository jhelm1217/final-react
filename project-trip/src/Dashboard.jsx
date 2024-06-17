// // Dashboard.js
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';


// const Dashboard = () => {
//     const navigate = useNavigate();

// const handleLogout =() => {
//     // Implement logout logic here, clearing the token from localStorage
//     localStorage.removeItem('token');
//     navigate('/');
//   }
  

//   return (
//     <div>
//         <button onClick={handleLogout} style={{ marginRight: 20, color: 'white', background: 'purple', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>

//       <h1>Dashboard</h1>
//       <ul>
//         <li><Link to='/create-trip/'>Create a Trip</Link></li>
//         <li><Link to='/get-trips/'>View Upcoming Trips</Link></li>
//         <li><Link to='/get-completed-trips/'>View Completed Trips</Link></li>

//       </ul>
//     </div>
//   );
// };


// export default Dashboard;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Implement logout logic here, clearing the token from localStorage
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
      <div className='page-container'>
        <div className="dashboard-container">
            <button onClick={handleLogout} className="logout-button">Logout</button>
            <h1 className="dashboard-header">Dashboard</h1>
            <ul>
                <li><Link to='/create-trip/' className="dashboard-link">Create a Trip</Link></li>
                <li><Link to='/get-trips/' className="dashboard-link">View Upcoming Trips</Link></li>
                <li><Link to='/get-completed-trips/' className="dashboard-link">View Completed Trips</Link></li>
            </ul>
        </div>
        </div>
    );
};

export default Dashboard;

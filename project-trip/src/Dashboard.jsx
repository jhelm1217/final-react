import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Implement logout logic here, clearing the token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('username')
        navigate('/');
    }

    return (
          
        <div className='dashboard-page-container'>
          <button onClick={handleLogout} className="logout-button">Logout</button>
          <hr />
        <div className="dashboard-container">
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

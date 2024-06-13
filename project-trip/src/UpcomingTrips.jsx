import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getTrips } from './api'
import { AuthContext } from "./context";


const UpcomingTrips = () => {
    const [upcomingTrips, setUpcomingTrips] = useState([]);
    const { auth } = useContext(AuthContext)

    useEffect(() => {
        getTrips ({ auth }) 
        .then(trips => {
            setUpcomingTrips(trips);
        })
        .catch(error => {
            console.error('Error fetching upcoming trips:', error);
        });
}, [auth]);
    // }, []);
    

    return (
        <div>
            <Link to="/dashboard">Back to Dashboard</Link>
            <h2>Upcoming Trips</h2>
            <ul> 
                
                 {upcomingTrips.map(tripData => (
                    <li key={tripData.id}>
                        <Link to={`/trips/${tripData.id}`}>
                            {tripData.name} - {tripData.destination} ({tripData.start_date} to {tripData.end_date})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )

}


export default UpcomingTrips

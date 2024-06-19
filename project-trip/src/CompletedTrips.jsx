import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from "./context";
import { getCompletedTrip } from './api';


const CompletedTrip = () => {
    const [completedTrips, setCompletedTrips] = useState([]);
    const { auth } = useContext(AuthContext)


    
    useEffect(() => {
        if (auth) {
        getCompletedTrip({ theNewTokenName: auth.accessToken }) 
            .then(trips => {
                setCompletedTrips(trips); 
            })
            .catch(error => {
                console.error('error woth completed trips: ', error)
            })
        }
    }, [auth]);
    
    return (
        <div>
            <Link to="/dashboard">Back to Dashboard</Link>
            <br />
            <h2> Completed Trips!</h2>
            <ul>
                {completedTrips.map(trip => (
                    <li key={trip.id}>{trip.name} - {trip.date}</li>
                ))}
            </ul>
        </div>
    );
}

export default CompletedTrip;


// useEffect(() => {
//     axios.get('http://localhost:8000/get-completed-trips/')
//         .then(response => {
//             setCompletedTrips(response.data);
//         })
//         .catch(error => {
//             console.error('Error fetching completed trips:', error);
//         });
// }, [auth]);
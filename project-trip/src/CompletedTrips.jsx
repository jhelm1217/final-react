import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from "./context";
import { getCompletedTrip } from './api';


//this is to have my dates formatted in the order month, day, year
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
        <div className='upcoming-trips-container'>
            <Link to="/dashboard" className="back-to-dashboard"> Back to Dashboard</Link>
            <br />
            <h2> Completed Trips!</h2>
            <div className='trip-list'>
            {/* <ul>
                {completedTrips.map(trip => (
                    <li key={trip.id}>{trip.name} - {trip.date}</li>
                ))}
            </ul> */}
                {completedTrips.map(trip => (
                    <div key={trip.id} className="trip-card">
                        <h3>{trip.name}</h3>
                        <p>Destination: {trip.destination}</p>
                        <p>{formatDate(trip.end_date)} to {formatDate(trip.start_date)}</p>

                </div>
                ))}
                    

        </div>
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
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'


// const CompletedTrip = () => {
//     const [completedTrips, setCompletedTrips] = useState([])

//     useEffect(()=> {
//         axios.get('http://localhost:8000/get-completed-trips/')
//         .then(response => {
//             setCompletedTrips(response.data);
//         })
//         .catch(error => {
//             console.error('Error fetching completed trips:', error);
//         });
//     }, []);

//     return (
//         <div>
//             <Link to="/dashboard">Back to Dashboard</Link>
//             <br />

//             <h2> Completed Trips!</h2>
//             <ul>
//                 {completedTrips.map(trip => (
//                     <li key={trip.id}>{trip.name} - {trip.date}</li>
//                 ))}
//             </ul>
//         </div>
//     )



// }



// export default CompletedTrip


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CompletedTrip = () => {
    const [completedTrips, setCompletedTrips] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/get-completed-trips/')
            .then(response => {
                setCompletedTrips(response.data);
            })
            .catch(error => {
                console.error('Error fetching completed trips:', error);
            });
    }, []);

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
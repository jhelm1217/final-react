// import React, { useEffect, useState, useContext } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import { AuthContext } from "./context";
// import { getTripDetails } from './api';




// const TripDetails = () => {
//     const { id } = useParams();
//     const [trip, setTrip] = useState(null);
//     const { auth } = useContext(AuthContext)

    

//     useEffect(() => { 
//         if (id && auth) {
//             getTripDetails ({ id, auth })
//                 .then(data => {
//                     setTrip(data);
//                 })
//                 .catch (error => {
//                     console.log('Errorloading trip details: ', error)
//                 })
//         }

//     }, [id, auth]);
    
//     if (!trip) {
//         return <div>Loading...</div>;
//     }
    
//     return (
//         <div>
//             <h2>{tripData.name}</h2>
//             <p>Destination: {tripData.destination}</p>
//             <p>Start Date: {tripData.start_date}</p>
//             <p>End Date: {tripData.end_date}</p>
//             <p>Description: {tripData.description}</p>
//         </div>
//     );
// }

// export default TripDetails;



    // useEffect(() => {
    //     axios.get(`http://localhost:8000/get-trips-details/:id/`)
    //         .then(response => {
    //             setTrip(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error with displaying trip details:', error);
    //         });
    // }, [id]);
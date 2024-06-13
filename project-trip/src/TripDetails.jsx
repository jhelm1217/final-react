import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const TripDetails = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/get-trips/${id}`)
            .then(response => {
                setTrip(response.data);
            })
            .catch(error => {
                console.error('Error with displaying trip details:', error);
            });
    }, [id]);

    if (!trip) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{tripData.name}</h2>
            <p>Destination: {tripData.destination}</p>
            <p>Start Date: {tripData.start_date}</p>
            <p>End Date: {tripData.end_date}</p>
            <p>Description: {tripData.description}</p>
        </div>
    );
}

export default TripDetails;

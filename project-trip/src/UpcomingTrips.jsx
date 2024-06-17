import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getTrips, deleteTrip, updateTrip, addFriend } from './api'
import { AuthContext } from "./context";


const UpcomingTrips = () => {
    const [upcomingTrips, setUpcomingTrips] = useState([]);
    const { auth } = useContext(AuthContext)
    const [friendUsername, setFriendUsername] = useState('');

    useEffect(() => {
        getTrips ({ auth }) 
        .then(trips => {
            setUpcomingTrips(trips);
        })
        .catch(error => {
            console.error('Error fetching upcoming trips:', error);
        });
    }, [auth]);

    const handleAddFriend = (tripId) => {
        //find the trip
        const index = upcomingTrips.findIndex(trip => trip.id === tripId);
        if (index === -1) {
            console.error('trip not found');
            return;
        }
        //make a copy of the trip to update
        const updatedTrip = { ...upcomingTrips[index] };

        //add my friends username to the trip 
        updatedTrip.friends.push(friendUsername);

        //update the specific trip in the array
        const updatedTrips = [...upcomingTrips];
        updatedTrips[index] = updatedTrip;
        setUpcomingTrips(updatedTrips);

        addFriend({ auth, tripId, username: friendUsername})
            .then(response => {
                console.log('friend added to trip: ', response);
            })
            .catch(error => {
                console.error('error with your friens: ', error)
                setUpcomingTrips(upcomingTrips)
            })
    }

    const handleDelete = (tripId) => {
        deleteTrip({ auth, id: tripId })
            .then(response => {
                setUpcomingTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));
            })
            .catch(error => {
                console.error('Error deleting trip:', error);
            });
    };


    const handleEdit = ( tripId, tripData) => {
        const updatedTripData = {
            name: tripData.tripName,
            destination: tripData.destination,
            start_date: tripData.start_date,
            end_date: tripData.end_date
        }

        updateTrip ({ auth, id: tripId, data: updatedTripData })

        .then(response => {
            setUpcomingTrips(prevTrips => prevTrips.map(trip => tripId === tripId ? response.data : trip));
        })
        .catch(error => {
            console.error('Error updating trip:', error);
        });
    };


    return (
        <div className="upcoming-trips-container">
            <Link to="/dashboard" className="back-to-dashboard">Back to Dashboard</Link>
            <h2>Upcoming Trips</h2>
            <div className="trip-list">
                {upcomingTrips.map(tripData => (
                    <div key={tripData.id} className="trip-card">
                        <h3>{tripData.name}</h3>
                        <p>Destination: {tripData.destination}</p>
                        <p>Dates: {tripData.start_date} to {tripData.end_date}</p>
                        <input
                            className='text-muted'
                            type="text"
                            placeholder="Add Friend's Username"
                            value={friendUsername[tripData.id] || ''}
                            onChange={(e) => setFriendUsername({ ...friendUsername, [tripData.id]: e.target.value})}
                        />
                        <button onClick={() => handleAddFriend(tripData.id)}>Add Friend</button>
                        <button onClick={() => handleEdit(tripData.id)}>Edit</button>
                        <button onClick={() => handleDelete(tripData.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UpcomingTrips

    {/* <Link to='/get-trips-details/${params.id}/'>View Details</Link> */}

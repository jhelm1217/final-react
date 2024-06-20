import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getTrips, deleteTrip, updateTrip, addFriend } from './api'
import { AuthContext } from "./context";



const CountdownTimer = ({ endDate }) => {
    const calculateTimeLeft = () => {
      const difference = +new Date(endDate) - +new Date();
      let timeLeft = {};
  
      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
  
      return timeLeft;
    };
  
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
  
      return () => clearTimeout(timer);
    });
  
    const timerComponents = [];
  
    Object.keys(timeLeft).forEach((interval) => {
      if (!timeLeft[interval]) {
        return;
      }
  
      timerComponents.push(
        <span key={interval}>
          {timeLeft[interval]} {interval}{" "}
        </span>
      );
    });
  
    return (
      <div>
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </div>
    );
  };
  
  
const UpcomingTrips = () => {
    const [upcomingTrips, setUpcomingTrips] = useState([]);
    const [completedTrips, setCompletedTrips] = useState([]);
    const { auth } = useContext(AuthContext)
    const [friendUsername, setFriendUsername] = useState('');
    const [totalCount, setTotalCount] = useState({ 'Upcoming' : 0, Completed: 0 });

    useEffect(() => {
        if (auth) {
            console.log('fetch the auth: ', auth.user)
            getTrips ({ auth }) 
                .then(trips => {
                    const userTrips = trips.filter(trip => trip.created_By === auth.createdBy);
                    const upcoming = userTrips.filter(trip => !trip.completed);
                    const completed = userTrips.filter(trip => trip.completed);

                    setUpcomingTrips(upcoming);
                    setCompletedTrips(completed);

                    const totalCount = {
                        Completed: userTrips.filter(trip => trip.completed).length,
                        'Upcoming': userTrips.filter(trip => !trip.completed).length
                    };
                setTotalCount(totalCount);
                })
                .catch(error => {
                console.error('Error fetching upcoming trips:', error);
            });
        }
    }, [auth]);
       

    const handleCheckboxChange = (tripId) => {
        const tripToUpdate = upcomingTrips.find(trip => trip.id === tripId);
        if (tripToUpdate) {
            const updatedTrip = { ...tripToUpdate, completed: !tripToUpdate.completed };
    
            updateTrip({ theNewTokenName: auth.accessToken, id: tripId, tripData: { completed: updatedTrip.completed } })
                .then(response => {
                    console.log('Trip updated:', response.data);
                    if (updatedTrip.completed) {
                        setUpcomingTrips(prev => prev.filter(trip => trip.id !== tripId));
                        setCompletedTrips(prev => [...prev, updatedTrip]);
                    } else {
                        setCompletedTrips(prev => prev.filter(trip => trip.id !== tripId));
                        setUpcomingTrips(prev => [...prev, updatedTrip]);
                    }
                })
                .catch(error => {
                    console.error('Error updating trip:', error);
                });
        }
    };
    
    
    // const handleAddFriend = (tripId) => {
    //     //find the trip
    //     const index = upcomingTrips.findIndex(trip => trip.id === tripId);
    //     if (index === -1) {
    //         console.error('trip not found');
    //         return;
    //     }
    //     //make a copy of the trip to update
    //     const updatedTrip = { ...upcomingTrips[index] };

    //     //add my friends username to the trip 
    //     updatedTrip.friends.push(friendUsername[tripId]);

    //     //update that trip in the list
    //     const updatedTrips = [...upcomingTrips];
    //     updatedTrips[index] = updatedTrip;
    //     setUpcomingTrips(updatedTrips);

    //     addFriend({ auth, tripId, username: friendUsername[tripId] })
    //         .then(response => {
    //             console.log('friend added to trip: ', response);
    //         })
    //         .catch(error => {
    //             console.error('error with your friens: ', error)
    //             setUpcomingTrips(upcomingTrips)
    //         })
    // }

    const handleAddFriend = (tripId) => {
        const tripToUpdate = upcomingTrips.find(trip => trip.id === tripId);
        if (!tripToUpdate) {
            console.error('Trip not found');
            return;
        }

        const updatedTrip = { ...tripToUpdate, friends: [...tripToUpdate.friends, friendUsername[tripId]] };

        addFriend({ auth, tripId, username: friendUsername[tripId] })
            .then(response => {
                console.log('Friend added to trip:', response);
                setUpcomingTrips(prevTrips => prevTrips.map(trip => trip.id === tripId ? updatedTrip : trip));
                setFriendUsername('');
            })
            .catch(error => {
                console.error('Error adding friend:', error);
            });
    };



    const handleDelete = (tripId) => {
        deleteTrip({ auth, id: tripId })
            .then(response => {
                setUpcomingTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));
            })
            .catch(error => {
                console.error('Error deleting trip:', error);
            });
    };


    // const handleEdit = ( tripId, tripData) => {
    //     const updatedTripData = {
    //         name: tripData.tripName,
    //         destination: tripData.destination,
    //         start_date: tripData.start_date,
    //         end_date: tripData.end_date
    //     }

    //     updateTrip ({ auth, id: tripId, data: updatedTripData })

    //     .then(response => {
    //         setUpcomingTrips(prevTrips => prevTrips.map(trip => trip.id === tripId ? response.data : trip));
    //         //  if the trip id equals the trip id, it will allow us to update the details 
    //     })
    //     .catch(error => {
    //         console.error('Error updating trip:', error);
    //     });
    // };


    return (
        <div className="upcoming-trips-container">
            <Link to="/dashboard" className="back-to-dashboard">Back to Dashboard</Link>
            <hr />
            <h2 style={{ color: 'beige', textAlign: 'center'}}>Upcoming Trips</h2>
            <div className="trip-list">
                {upcomingTrips.map(tripData => (
                    tripData && (
                    <div key={tripData.id} className="trip-card">
                        <h3>{tripData.name}</h3>
                        <p>Destination: {tripData.destination}</p>
                        <p>Dates: {tripData.start_date} to {tripData.end_date}</p>
                        <label>
                            Completed:
                            <input
                                type="checkbox"
                                checked={tripData.completed}
                                onChange={() => handleCheckboxChange(tripData.id)}
                            />
                        </label>
                        <CountdownTimer endDate={tripData.end_date} />
                        <input
                            className='text-muted'
                            type="text"
                            placeholder="Add Friend's Username"
                            value={friendUsername[tripData.id] || ''}
                            onChange={(e) => setFriendUsername({ ...friendUsername, [tripData.id]: e.target.value})}
                        />
                        <button onClick={() => handleAddFriend(tripData.id)}>Add Friend</button>
                        <button onClick={() => handleDelete(tripData.id)}>Delete</button>
                        <ul>
                            <h6>Friends added to the trip!</h6>
                            {tripData.friends.map((friend, index) => (
                                <li key={index}>{friend}</li>
                            ))}
                        </ul>
                    </div>
                )))}
            </div>
        </div>
    );
}

export default UpcomingTrips




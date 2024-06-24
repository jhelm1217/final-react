//The meat and potatoes of the project! yay

import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getTrips, deleteTrip, updateTrip, addFriend } from './api'
import { AuthContext } from "./context";
import { format } from 'date-fns'

//this is to have my dates formatted in the order month, day, year
// const formattedDate = format(newDate(), 'MM-dd-yyyy')
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // return new Date(dateString).toLocaleDateString(undefined, options);
    return format(new Date(dateString), 'MM-dd-yyyy')
  };

  //my logic for my timer 
const CountdownTimer = ({ endDate, onComplete }) => {
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
      } else {
        if (onComplete) {
            onComplete();
        }
        timeLeft = {
            days: 0, 
            hours: 0,
            minutes: 0,
            seconds: 0,

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
        <div className="countdown-timer">
        <div className="time-values">
            <span>{String(timeLeft.days).padStart(2, '0')}</span>:
            <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
            <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
        <div className="time-labels">
            <span>Days</span>
            <span>Hours</span>
            <span>Minutes</span>
            <span>Seconds</span>
        </div>
        </div>
    );
    };

  
  //logic for my upcoming trips, here we go!
const UpcomingTrips = () => {
    const [upcomingTrips, setUpcomingTrips] = useState([]);
    const [completedTrips, setCompletedTrips] = useState([]);
    const { auth } = useContext(AuthContext)
    const [friendUsername, setFriendUsername] = useState({});
    const [totalCount, setTotalCount] = useState({ 'Upcoming' : 0, Completed: 0 });

    useEffect(() => {
        if (auth) {
            console.log('fetch the auth: ', auth.user)
            getTrips ({ auth }) 
                .then(trips => {
                    const userTrips = trips.filter(trip => trip.created_By === auth.createdBy);
                    const upcoming = userTrips.filter(trip => !trip.completed);
                    const completed = userTrips.filter(trip => trip.completed);


                    // Sort upcoming trips by start date
                    const sortedUpcoming = upcoming.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

                    setCompletedTrips(userTrips.filter(trip => trip.completed));
                    setUpcomingTrips(sortedUpcoming);
                    
                    // // Sort upcoming trips by end date
                    // const sortedUpcoming = upcoming.sort((a, b) => new Date(a.end_date) - new Date(b.end_date));

                    // setUpcomingTrips(sortedUpcoming);
                    // setUpcomingTrips(upcoming);
                    // setCompletedTrips(completed);

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

    // completeion function when the timer gets to 0 0 0 0 
    const markTripAsCompleted = (tripId) => {
        const tripToUpdate = upcomingTrips.find(trip => trip.id === tripId);
        if (tripToUpdate) {
            const updatedTrip = { ...tripToUpdate, completed: true };
            updateTrip({ theNewTokenName: auth.accessToken, id: tripId, tripData:{ completed: true} })
                .then(response => {
                    setUpcomingTrips(prev => prev.filter(trip => trip.id !== tripId));
                    setCompletedTrips(prev => [...prev, updatedTrip]);
                })
                .catch(error => {
                    console.error('Error with marking as completed: ', error)
                });
        }
    }
       
// checking the box to update the trip to being completed!
    // const handleCheckboxChange = (tripId) => {
    //     const tripToUpdate = upcomingTrips.find(trip => trip.id === tripId);
    //     if (tripToUpdate) {
    //         const updatedTrip = { ...tripToUpdate, completed: !tripToUpdate.completed };
    
    //         updateTrip({ theNewTokenName: auth.accessToken, id: tripId, tripData: { completed: updatedTrip.completed } })
    //             .then(response => {
    //                 console.log('Trip updated:', response.data);
    //                 if (updatedTrip.completed) {
    //                     setUpcomingTrips(prev => prev.filter(trip => trip.id !== tripId));
    //                     setCompletedTrips(prev => [...prev, updatedTrip]);
    //                 } else {
    //                     setCompletedTrips(prev => prev.filter(trip => trip.id !== tripId));
    //                     setUpcomingTrips(prev => [...prev, updatedTrip]);
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error('Error updating trip:', error);
    //             });
    //     }
    // };
    
// logic for adding a friend to the trip. 
//still having issues with having the trip to display onto the friends page after being added to the trip 
    // const handleAddFriend = (tripId) => {
    //     const tripToUpdate = upcomingTrips.find(trip => trip.id === tripId);
    //     if (!tripToUpdate) {
    //         console.error('Trip not found');
    //         return;
    //     }

    //     const updatedTrip = { ...tripToUpdate, friends: [...tripToUpdate.friends, friendUsername[tripId]] };

    //     addFriend({ auth, tripId, username: friendUsername[tripId] })
    //         .then(response => {
    //             console.log('Friend added to trip:', response);
    //             setUpcomingTrips(prevTrips => prevTrips.map(trip => trip.id === tripId ? updatedTrip : trip));
    //             // setFriendUsername('');
    //             setFriendUsername(prev => ({ ...prev, [tripId]: ''}))
    //         })
    //         .catch(error => {
    //             console.error('Error adding friend:', error);
    //         });
    // };
    const handleAddFriend = (tripId) => {
        const tripToUpdate = upcomingTrips.find(trip => trip.id === tripId);
        if (!tripToUpdate) {
            console.error('Trip not found');
            return;
        }
    
        const newUsername = friendUsername[tripId];
        if (!newUsername) {
            console.error('Username is empty');
            return;
        }
    
        const updatedTrip = { ...tripToUpdate, friends: [...tripToUpdate.friends, newUsername] };
    
        addFriend({ auth, tripId, username: newUsername })
            .then(response => {
                console.log('Friend added to trip:', response);
                setUpcomingTrips(prevTrips => prevTrips.map(trip => trip.id === tripId ? updatedTrip : trip));
                setFriendUsername(prev => ({ ...prev, [tripId]: '' }));
            })
            .catch(error => {
                console.error('Error adding friend:', error);
            });
    };
    

//logic for deleting a trip!
    const handleDelete = (tripId) => {
        deleteTrip({ auth, id: tripId })
            .then(response => {
                setUpcomingTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));
            })
            .catch(error => {
                console.error('Error deleting trip:', error);
            });
    };


    return (
        <div className="upcoming-trips-container">
            <Link to="/dashboard" className="back-to-dashboard">Back to Dashboard</Link>
            <hr />
            <h2 style={{ color: 'beige', textAlign: 'center'}}>Upcoming Trips</h2>
            <div className="trip-list">
                {upcomingTrips.map(tripData => (
                    tripData && (
                        <div key={tripData.id} className="trip-card">
                            <CountdownTimer endDate={tripData.start_date} onComplete={() => markTripAsCompleted(tripData.id)} />
                        <h3>{tripData.name}</h3>
                        <p>Created by: {tripData.createdBy}</p> 
                        <p>Destination: {tripData.destination}</p>
                        <p>Dates: {formatDate(tripData.start_date)} to {formatDate(tripData.end_date)}</p>
                        {/* <label>
                            Completed:
                            <input
                                type="checkbox"
                                checked={tripData.completed}
                                onChange={() => handleCheckboxChange(tripData.id)}
                            />
                        </label> */}
                        <input
                            className='text-muted'
                            type="text"
                            placeholder="Add Friend's Username"
                            value={friendUsername[tripData.id] || ''}
                            // onChange={(e) => setFriendUsername({ ...friendUsername, [tripData.id]: e.target.value })}
                            onChange={(e) => setFriendUsername({ ...friendUsername, [tripData.id]: e.target.value })}

                        />
                        <button onClick={() => handleAddFriend(tripData.id)}>Add Friend</button>
                        <button onClick={() => handleDelete(tripData.id)}>Delete</button>
                            <h6 style={{ textAlign: 'center'}}>Friends Added!</h6>
                        <ul>
                            {/* {tripData.friends.map((friendUsername, index) => (
                                <li key={index}>{friendUsername}</li>
                            ))} */}
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




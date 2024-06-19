import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from "./context";
import { createTrip } from './api'
import { getTrips } from './api';
import './App.css'



const CreateATrip = ({ setUpcomingTrips }) => {
    const [tripDetails, setTripDetails] = useState({
        tripName: '',
        destination: '',
        startDate: '',
        endDate: '',
        createdBy: ''
    })

    const { auth } = useContext( AuthContext)

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTripDetails({
            ...tripDetails,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    const submitTrip = () => {
        createTrip({ theNewTokenName: auth, tripData: tripDetails })
            .then(() => {
                console.log('Trip created successfully');
                window.alert('trip created successfully!')
                
                setTimeout(() => {
                getTrips({ theNewTokenName: auth.accessToken })
                    .then(response => {
                        console.log('Get Trips: ', response.data)
                        setUpcomingTrips(response.data);
                    })
                    .catch(error => {
                        console.log('Error with trips here: ', error)
                    })
                }, 500);
            })
            .catch(error => {
                console.error('Error creating trip:', error);
            });
    };

 

    return (
        <div className='create-trip-page-container'>
            <Link to="/dashboard"
                style={{
                padding: '10px 20px',
                marginBottom: '20px',
                color: 'white',
                backgroundColor: 'darkslategrey',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
                }}
            >
            Back to Dashboard</Link>
            <hr />
        <div className='create-trip-container'>
            <div>
                <h2 style={{ color: 'beige', textAlign: 'center'}}>Create A Trip</h2>
            <br />
            <input
                type='text'
                name='tripName'
                placeholder="Enter trip name"
                value={tripDetails.tripName}
                onChange={handleInputChange}
            />
            <br />
            <input
                type="text"
                name='destination'
                placeholder="Enter destination"
                value={tripDetails.destination}
                onChange={handleInputChange}           
             />
            <br />
            <input
                type="date"
                name='startDate'
                placeholder="Enter Start date"
                value={tripDetails.startDate}
                onChange={handleInputChange}           
             />
            <br />
            <input
                type="date"
                name='endDate'
                placeholder="Enter End date"
                value={tripDetails.endDate}
                onChange={handleInputChange}            
            />
            <br />
            {/* <label>
                Completed:
                <input
                type='checkbox'
                name='isCompleted'
                checked={tripDetails.isCompleted}
                onChange={handleInputChange}
            />
            </label> */}
            <br />
            <input
                type='text'
                name='createdBy'
                placeholder='CreatedBy'
                value={tripDetails.createdBy}
                onChange={handleInputChange}
            />

            <button onClick={submitTrip}>Create Trip</button>
        </div>
        </div>
        </div>
    );
};

export default CreateATrip;

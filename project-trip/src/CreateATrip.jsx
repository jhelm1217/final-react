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
        // isCompleted: false,
        createdBy: ''
    })

    const { auth } = useContext( AuthContext)
    console.log(auth)

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTripDetails({
            ...tripDetails,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    const submitTrip = () => {
        createTrip({ theNewTokenName: auth.accessToken , tripData: tripDetails })
            .then(() => {
                console.log('Trip created successfully');
                getTrips({ theNewTokenName: auth.accessToken })
                    .then(response => {
                        console.log('Get Trips: ', response.data)
                        setUpcomingTrips(response.data);
                    })
                    .catch(error => {
                        console.log('Error with trips here: ', error)
                    })
            })
            .catch(error => {
                console.error('Error creating trip:', error);
            });
    };

 

    return (
        <div className='page-container'>
        <div className='create-trip-container'>
            <div>
            <Link to="/dashboard">Back to Dashboard</Link>
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

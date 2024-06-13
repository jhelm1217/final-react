import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from './context';
import CreateMessage from './CreateMessage';
import './App.css'
import { deleteMessage, getMessages } from './api';
import UploadImage from './UploadImage';

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { auth } = useContext(AuthContext);

    const handleLogout = () => {
        removeToken(auth.accessToken); // remove the user's access and route back to home page. BUT it aint working right now. lol
        setAuth(null);
        navigate('/');
      }

    useEffect(() => {
        const interval = setInterval (() => {
            if (auth.accessToken) {
                getMessages({ auth }).then(
                    res => setMessages(res.data)
                )
            }
        }, 3000); //get messages every 3 seconds 
        return () => clearInterval(interval);
    }, [auth.accessToken]);


    const handleDelete = (id) => {
        deleteMessage(id, { auth }) //This is not complete
        .then(() => {
            setMessages(messages.filter(message => message.id != id));
        })
        .catch(error => {
            console.log('Errrrror Deleting message: ', error)
        })
    }
  
  
    return (
        <div className="message-list-container">
            {auth && <button onClick={handleLogout} style={{ marginLeft: '10px', color: 'white', backgroundColor: 'purple', borderRadius: '10px' }}>Logout</button>}

            <h2 style={{ color: 'teal', textAlign: 'center' }}>Go With The Flow </h2>
            
            <div className='messageList'>
                {messages.slice().reverse().map((message) => ( //returns the messages in a reversed order.
                    <div key={message.id} className="message-bubble">

                        <strong>{message.user}:</strong> {message.content} 
                        <br />
                        {message.image && 
                        <img src={message.image} 
                        style={{ width: '30%'}}/>}
                        <br /> 
                        <small>{message.created_at}</small> 
                        <br />
                        
                        <button onClick={() => handleDelete(message.id)} style={{ backgroundColor: 'pink', fontFamily: 'cursive', borderRadius: '10px'}}> Delete </button>

                    </div>
                    
            ))}
            </div>
            <div className="create-message-container">

                <CreateMessage />
                <UploadImage />

            </div>
        </div>
    );
    
}

export default MessageList;
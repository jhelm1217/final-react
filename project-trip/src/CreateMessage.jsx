import React, { useContext, useState } from "react"
import { createMessage } from "./api";
import { AuthContext } from "./context";

const CreateMessage = () => {
    const [messageContent, setMessageContent] = useState('');
    const { auth } = useContext( AuthContext)


    const handleMessageChange = (e) => {
        setMessageContent(e.target.value);
    }

    const handleSubmit = (e) => { //this should send messages to backend. 
        e.preventDefault();
        createMessage({ auth, content: messageContent })
    }


    return (
        <div>
            <input
            type="text"
            value={messageContent}
            onChange={handleMessageChange}
            placeholder="What's on your mind?"
            />
            <button onClick={handleSubmit} style={{ color: 'white ', backgroundColor: 'purple', borderRadius: '10px'}}>Send 💜 </button>
        </div>
    )
}

export default CreateMessage




import React, { useContext, useState } from "react"
// import { AuthContext } from "./context"
// import { getToken } from "./api"
import { useNavigate } from "react-router-dom"
import { createUser } from './api'


const CreateNewUser = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const navigate = useNavigate()

  const submit = () => {
    createUser({ username, password, firstName, lastName })
    .then (response => {
      console.log('errrror: ', response)
      navigate('/login')
    })
    
    .catch(error => {
      console.log('Errrorrr creating: ', error)
    })
  }
  
  const handleClick=() => {
    submit();

  }

  return (
    <div className="p-5 container" style={{ textAlign: 'center', color: 'white'}}>

      <h1>Create New User</h1>
      <div>
        <div>Username:</div>
        <input
          className="text-muted"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>

      <div>
        <div>Password:</div>
        <input
          className="text-muted"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div>
        <div>First Name:</div>
        <input
          className="text-muted"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
      </div>

      <div>
        <div>Last Name:</div>
        <input
          className="text-muted"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
      </div>

      <div style={{ marginTop: 20 }}>
      <button onClick={handleClick} style={{ color: 'white', backgroundColor: 'teal', borderRadius: '10px'}}>Submit</button>

      </div>
      
    </div>
  )
}

export default CreateNewUser
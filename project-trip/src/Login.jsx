import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "./context"
import { getToken } from "./api"

function Login() {
  const { auth } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  useEffect (() => {
    if (auth.accessToken ) {
      navigate('/dashboard');
    }

  }, [auth.accessToken]) 

  const submit = () => {
    getToken({ auth, username, password })
  
  }

 
  const handleClick=() => {
    submit();

  }


  return (
    <div className="p-5 container" style={{ textAlign: 'center', color: 'white'}}>

      <h1>Login</h1>
      <p>Vacay Time! </p>
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
          type = "password"  //Hides the characters of the password!!!
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={handleClick} style={{ color: 'white', backgroundColor: 'teal', borderRadius: '10px'}}>Log in!</button>
   
      </div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      <hr />

    </div>
  )
}

export default Login

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        email,
        password
      });
      // Store the user ID in session storage
      sessionStorage.setItem('userid', response.data.user.id);
      // Redirect the user to the quiz list page
      navigate('/');
    } catch (error) {
      // Set the error message state variable to the error message from the server
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <>
    <div style={{display: 'flex', flex: '1', justifyContent: 'center'}}>
        <div style={{ padding: '2rem', color: 'white', backgroundColor: 'rgb(18, 109, 255, 1)', borderRadius: '1rem'}}>
            <h1>Login</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
    </>
  );
}

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userid');

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('userid');
    // Redirect the user to the login page
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'end' }}>
      <div>
        {userId ? (
          <button onClick={handleLogout} style={{backgroundColor: 'rgb(18, 109, 255, 1)', color: 'white', width: 'max-content', padding: '.5rem 1rem', borderRadius: '.4rem', border: 'none',cursor: 'pointer'}}>Logout</button>
        ) : (
          <Link to="/login" style={{backgroundColor: 'rgb(18, 109, 255, 1)', color: 'white', width: 'max-content', padding: '.5rem 1rem', borderRadius: '.4rem', border: 'none' ,cursor: 'pointer', textDecoration: 'none'}}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
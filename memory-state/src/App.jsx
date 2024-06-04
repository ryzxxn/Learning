import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/home';
import Test from './pages/test';
import memoryState from 'memory-state';

function App() {
  const [currentLocation, setCurrentLocation] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentLocation(window.location.pathname);

      if (sessionStorage.getItem('random')) {
        memoryState.setState('user', {name: 'Jhon', age: '30', random: sessionStorage.getItem('random')})
      }
      sessionStorage.clear()
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  memoryState.setState('user', { name: 'John', age: 30 });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

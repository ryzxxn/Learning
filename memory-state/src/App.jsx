import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/home';
import Test from './pages/test';
import memoryState from 'memory-state';

function App() {

  memoryState.setState('user', { name: 'John', age: 69 });

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

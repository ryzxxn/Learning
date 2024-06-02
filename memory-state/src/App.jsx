import './App.css'
import memoryState from 'memory-state';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Test from './pages/test';

function App() {
  memoryState.setState('user', { name: 'John', age: 30 });

  const user = memoryState.getState('user')

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="test" element={<Test />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

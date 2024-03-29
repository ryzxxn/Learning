import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Leaderboard from './pages/leaderboard';
import Play from './pages/play';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

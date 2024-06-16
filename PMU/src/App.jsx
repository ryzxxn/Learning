import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from './pages/quiz'
import Test from './pages/test';
import Login from './pages/login';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="test" element={<Test />} />
          <Route path="login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

import React from 'react'
import { useNavigation } from 'react-router-dom'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/Login'
import JoySignInSideTemplate from './components/Login'
import Register from './components/Register'
// import Button from "@mui/joy/Button";

function App() {
  // const navigate = useNavigation();

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   navigate("/home");
  // };
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App

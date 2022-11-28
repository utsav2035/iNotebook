import React, { useState } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import './App.css';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';

export default function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/Login" element={<Login showAlert={showAlert} />} />
              <Route path="/Signup" element={<Signup showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  )
}




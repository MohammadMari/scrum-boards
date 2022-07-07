import React, { useState } from 'react';
import './App.css';
import { scrum_db } from './Database';
import Login from './Login';
import Nav from './Nav';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Logout from './Logout';

function App() {

  useState()

  return (
    <Router>
      <Nav/>
        <Routes>
          <Route path='/login' element={<Login />}/>
        </Routes>

        <Routes>
          <Route path='/logout' element={<Logout />}/>
        </Routes>
    </Router> 
  );
}

export default App;

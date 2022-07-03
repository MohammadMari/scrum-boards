import React from 'react';
import './App.css';
import { scrum_db } from './Database';
import Login from './Login';
import Nav from './Nav';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  //scrum_db.createUser("test", "test", "test@test.com", "password");

  return (
    <Router>
      <Nav/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
        </Routes>
    </Router> 
  );
}

export default App;

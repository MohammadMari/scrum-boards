import React, { useState } from 'react';
import './App.css';
import { scrum_db } from './Database';
import Nav from './Nav';
import Main from './Main';
import Login from './Login';
import Logout from './Logout';
import Registration from './Registration';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth'
import { scrum_auth, scrum_app } from './Database'

function App() {

  useState()
  const [user, loading, error] = useAuthState(scrum_auth);

  if (user)
  {
    return (
      <Router>
        <Nav/>
          <Routes>
              <Route path='' element={<Main />}/>
          </Routes>
          <Routes>
            <Route path='/logout' element={<Logout />}/>
          </Routes>
      </Router> 
    );
  }
  else {
    return (
      <Router>
        <Nav/>
          <Routes>
              <Route path='' element={<Login />}/>
          </Routes>
          <Routes>
            <Route path='/logout' element={<Logout />}/>
          </Routes>
          <Routes>
            <Route path ='/Registration' element={<Registration/>}/>
          </Routes>
      </Router> 
    );
  }

}

export default App;

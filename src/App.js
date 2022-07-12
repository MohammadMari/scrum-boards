import React, { useState } from 'react';
import './App.css';
import Nav from './Nav';
import Main from './Main';
import Login from './Login';
import Logout from './Logout';
import Registration from './Registration';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth'
import { scrum_auth } from './Database'

function App() {

  const [user, loading, error] = useAuthState(scrum_auth);

  if (user) {
    return (
      <Router>
        <Nav />
        <Routes>
          <Route path='' element={<Main />} />
        </Routes>
        <Routes>
          <Route path='/logout' element={<Logout />} />
        </Routes>
        <Routes>
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Nav />
        <Routes>
          <Route path='' element={<Login />} />
        </Routes>
        <Routes>
          <Route path='/logout' element={<Logout />} />
        </Routes>
        <Routes>
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </Router>
    );
  }

}

export default App;

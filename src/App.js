import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Main from './components/Main';
import Tasks from './components/Task';
import Login from './components/Login';
import Logout from './components/Logout';
import Registration from './components/Registration';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth'
import { scrum_auth, scrum_db } from './Database'
import { useList } from 'react-firebase-hooks/database';

function App() {

  const [user, loading, error] = useAuthState(scrum_auth);
  //console.log(user);
  //const [snapshot, loading_db, error_db] = useList(scrum_db.getReference(`users/${user.}`));

  if (user) {
    return (
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Main/>} />
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
          <Route path='/' element={<Login />} />
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

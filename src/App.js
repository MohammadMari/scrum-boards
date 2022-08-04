import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Tasks from './components/Task';
import Login from './components/Login';
import Logout from './components/Logout';
import Registration from './components/Registration';
import Boards from './components/Boards';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth'
import { scrum_auth, scrum_db } from './Database'
import { useListVals } from 'react-firebase-hooks/database';
import Account from './Account';

function App() {

  const [user, loading, error] = useAuthState(scrum_auth);
  //console.log(user);
  const [snapshot, loading_db, error_db] = useListVals(user ? scrum_db.getReference(`users/${user.uid}`) : null);
  //console.log(snapshot);

  const url = window.location.href;
  const lastSegment = url.split("/").pop();
  console.log(lastSegment);

  if (user && snapshot && !loading_db) {
    //checking to see if there is a board ID at the end of URL
    if (lastSegment == "logout" || lastSegment == "registration" || !lastSegment.length || lastSegment == "tasks")
    {
      return (
        <Router>
          <Nav />
          <Routes>
            <Route path='/logout' element={<Logout />} />
          </Routes>
          <Routes>
            <Route path='/registration' element={<Registration />} />
          </Routes>
          <Routes>
            <Route path='/' element={<Boards user={new Account(snapshot, user.uid, )} />} />
          </Routes>
        </Router>
      );
    }
    else {
       return (
        <Router>
          <Nav />
            <Tasks user={new Account(snapshot, user.uid)}/>
        </Router>
      );
    }
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

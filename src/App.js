import React from 'react';
import './App.css';
import { scrum_db } from './Database';
import Login from './Login';
import Nav from './Nav';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { scrum_listener } from './Listeners'

function App() {

  //scrum_db.createUser("test", "test", "test@test.com", "password");
  scrum_db.getAccountByID("M9QJgsKS0waqzCZcNfPJFWZiY1T2");
  scrum_listener.setLoginStateListener(loginStateCallback)

  return (
    <Router>
      <Nav/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
        </Routes>
    </Router> 
  );
}

function loginStateCallback(user) {
  if(user) {
    //Logged in
  } else {
    //Not logged in
    redirect
  }
}


export default App;

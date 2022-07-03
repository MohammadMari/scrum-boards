import React from 'react';
import './App.css';
import { scrum_db } from './Database';
import Login from './Login';
import Nav from './Nav';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

import { accountConverter } from './Account';

//User account class

//Firebase config

const firebaseConfig = {
  apiKey: "AIzaSyDONLZ1Wzj7zT-GHqmzhGZt2_Re-jMbY68",
  authDomain: "scrum-board-b3df8.firebaseapp.com",
  projectId: "scrum-board-b3df8",
  storageBucket: "scrum-board-b3df8.appspot.com",
  messagingSenderId: "422339418451",
  appId: "1:422339418451:web:bd1098b52732f2858b29a6",
  measurementId: "G-B5LXW3264P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {

  scrum_db.createUser("test", "test", "test@test.com", "password");
  scrum_db.authUser("test@test.com", "password");

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

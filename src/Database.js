import { initializeApp } from "firebase/app";
import { onValue, get, getDatabase, ref, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import Account from "./Account";

//User account class

//Firebase config

const firebaseConfig = {
    apiKey: "AIzaSyDONLZ1Wzj7zT-GHqmzhGZt2_Re-jMbY68",
    authDomain: "scrum-board-b3df8.firebaseapp.com",
    projectId: "scrum-board-b3df8",
    storageBucket: "scrum-board-b3df8.appspot.com",
    messagingSenderId: "422339418451",
    appId: "1:422339418451:web:bd1098b52732f2858b29a6",
    measurementId: "G-B5LXW3264P",
    databaseURL: "https://scrum-board-b3df8-default-rtdb.firebaseio.com"
};

const scrum_app = initializeApp(firebaseConfig);
const scrum_auth = getAuth();

class ScrumDatabase {

    constructor() {
        this.firebase_db = getDatabase(scrum_app);
    }

};

const scrum_db = new ScrumDatabase();

export { scrum_db, scrum_auth, scrum_app };
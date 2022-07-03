import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref, set } from 'firebase/database';

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

const app = initializeApp(firebaseConfig);
const bcrypt = require("bcryptjs");

class ScrumDatabase {
    

    /*  Creates a new user account
            first_name: user's first name
            last_name: user's last name
            email: user's email
            password: user's plaintext password

        return: user's Account object or null if not valid
    */

    constructor() {
        this.firebase_db = getDatabase(app);
    }

    createUser(first_name, last_name, email, password) {

        var hash = bcrypt.hashSync(password, 8);
        var userid = email;

        set(ref(this.firebase_db, 'users/' + userid.replace('.', '')), {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password_hash: hash
        });
    }

    authUser(email, password) {

        get(child(this.firebase_db, 'users/' + email.replace('.', '')).then((snapshot) => {
            if(snapshot.exists()) {
                console.log(snapshot.val());
                //if(bcrypt.compareSync(password, snapshot))
            } else {
                return false;
            }
        }));
        
    }
};

const scrum_db = new ScrumDatabase();

export { scrum_db };
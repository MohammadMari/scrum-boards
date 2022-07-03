import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
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

const app = initializeApp(firebaseConfig);
const bcrypt = require("bcryptjs");

class ScrumDatabase {

    constructor() {
        this.firebase_db = getDatabase(app);
    }

    getAccountByID(uid) {
        const dbRef = ref(this.firebase_db);
        get(child(dbRef, `users/${uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
              return new Account(snapshot);
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

          return null;
    }

    getCurrentUser() {
        const auth = getAuth(app);

        if(auth.currentUser)
            return this.getAccountByID(auth.currentUser.uid);
        else
            return null;

    }


    /*  Creates a new user account
            first_name: user's first name
            last_name: user's last name
            email: user's email
            password: user's plaintext password

        return: user's Account object or null if not valid
    */
    createUser(first_name, last_name, email, password) {

        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                set(ref(this.firebase_db, 'users/' + user.uid), {
                    first_name: first_name,
                    last_name: last_name,
                    email: email
                });

                console.log(user.uid);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;


                console.log(errorCode + " " + errorMessage);
            });
    }

    signInUser(email, password) {

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("User signed in: " + email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

        /*get(child(this.firebase_db, 'users/' + email.replace('.', '')).then((snapshot) => {
            if(snapshot.exists()) {
                console.log(snapshot.val());
                //if(bcrypt.compareSync(password, snapshot))
            } else {
                return false;
            }
        }));*/

    }

    signOutUser() {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

};

const scrum_db = new ScrumDatabase();

export { scrum_db };
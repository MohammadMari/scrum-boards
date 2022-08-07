import { initializeApp } from "firebase/app";
import { onValue, get, getDatabase, ref, set, push, remove } from 'firebase/database';
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

    createUser(firstName, lastName, email, userId) {
        set(ref(this.firebase_db, 'users/' + userId), {
            first_name: firstName,
            last_name: lastName,
            email: email,
            tables: []
        });
    }

    getReference(key) {
        return ref(this.firebase_db, key);
    }

    createTable(userid, board_name) {
        const tableRef = push(ref(this.firebase_db, `tables/`), {
            table_name: board_name
        });

        push(ref(this.firebase_db, `users/${userid}/tables`), tableRef.key);
    }

    deleteTable(user, table_id) {
        remove(ref(this.firebase_db, `tables/${table_id}`));
        set(ref(this.firebase_db, `users/${user.uid}` + userId), {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            tables: user.tables.filter(v => {
                return v != table_id;
            })
        });
    }

    createTask(table_id, task) {
        push(ref(this.firebase_db, `tables/${table_id}`), {
            name: task.name,
            description: task.description,
            due: task.due,
            type: task.type
        });
    }

    deleteTask(table_id, task) {
        remove(ref(this.firebase_db, `tables/${table_id}/${task.id}`));
    }

    editTask(table_id, task) {
        set(ref(this.firebase_db, `tables/${table_id}/${task.id}`), {
            name: task.name,
            description: task.description,
            due: task.due,
            type: task.type
        });
    }
};

const scrum_db = new ScrumDatabase();

export { scrum_db, scrum_auth, scrum_app };
import { scrum_db, scrum_auth } from "./Database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

class ScrumListener {

    constructor() {
        this.loginStateListener = null;
        this.accountStateListener = null;
    }

    setLoginStateListener(callback) {
        this.loginStateListener = callback;
        onAuthStateChanged(scrum_auth, this.loginStateListener);
    }
}

const scrum_listener = new ScrumListener();
export { scrum_listener };
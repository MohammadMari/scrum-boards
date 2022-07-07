import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'
import { scrum_auth, scrum_app } from './Database'

let wasSignedOut = false;

function Logout() {

  const [user, loading, error] = useAuthState(scrum_auth);


  if (user) {
    scrum_auth.signOut(scrum_app);
    console.log("Signed out");
    wasSignedOut = true;
  } else if (wasSignedOut) {
    return (
      <div>
        <p>Logged out....</p>
      </div>
    );
  } else if (loading) {
    return (
      <div>
        <p>Loading....</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not logged in...</p>
      </div>
    );
  }
}

export default Logout;
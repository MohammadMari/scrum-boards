import './Nav.css';
import { Link } from 'react-dom';
import { useAuthState } from 'react-firebase-hooks/auth'
import { scrum_auth, scrum_app } from './Database'

function logoutNav() {
    window.location.href = "/logout";
}

function Nav () {

    const [user, loading, error] = useAuthState(scrum_auth);


    if (user)
    {
        return (
           <div className='navbar'>
                <div className='navButton' onClick={() => logoutNav() }> Logout </div>
            </div> 
        );
    }
    else {
        return (
            <div className='navbar'>
             </div> 
         );
    }

    
}

export default Nav;
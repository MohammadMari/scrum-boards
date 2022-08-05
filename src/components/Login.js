import './Login.css';
import { useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth'
import { scrum_auth } from '../Database'
import { useState } from 'react';

function Login() {
    const [user, loading, error] = useAuthState(scrum_auth);
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

        const [password, setPassword] = useState('');
        const [
            signInWithEmailAndPassword,
            user_signin,
            loading_signin,
            error_signin,
        ] = useSignInWithEmailAndPassword(scrum_auth);

    if (user) {
        return (
            <div>
                <p>Signed In User: {user.email}</p>
                <a href='/logout' className='smallText'> Logout</a>
                    <br />
            </div>
        );
    } else if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    } else if (error && !errorMessage.length) {
        setErrorMessage("wa"); 
    } else {
        if (error_signin && !errorMessage.length) {
            setErrorMessage("Please enter correct email or password!");
        } if (user_signin) {
            return (
                <div>
                    <p>Logged in....</p>
                </div>
            );
        } else if (loading_signin) {
            return (
                <div>
                    <p>Loading....</p>
                </div>
            );
        }

        function signIn(email, password) {
            if (email != "" && password != "") {
                signInWithEmailAndPassword(email, password);
            }
            else {
                var errorElement = document.getElementById('error');
                errorElement.innerHTML = "Please enter valid username and password";
            }
        }

        return (
            <div className='loginMain'>
                <form className='loginForm'>
                    <div className='loginHeader'>
                        Login
                    </div>
                    <div className='input'>
                        <input type='email' name='user' placeholder='Email' onChange={(e) => setEmail(e.target.value)}>
                        </input>
                    </div>
                    <div className='input'>
                        <input type='password' name='pass' placeholder='Password' onChange={(e) => setPassword(e.target.value)}>
                        </input>
                    </div>

                    <a href='/Registration' className='smallText'> Sign Up</a>
                    <br />

                    <div className='error'> {errorMessage}</div>
                    <button className='loginButton' type='button' onClick={() => signIn(email, password)}>
                        Login
                    </button>
                </form>
            </div>
        );
    }

}

export default Login;
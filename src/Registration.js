import './Register.css';
import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { scrum_auth, scrum_db } from './Database'
import { useState } from 'react';

function Registration() {

    const [user, loading, error] = useAuthState(scrum_auth);
    const [
        createUserWithEmailAndPassword,
        userReg,
        loadingReg,
        errorReg,
    ] = useCreateUserWithEmailAndPassword(scrum_auth);

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

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
                <br />
            </div>
        );
    } else if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
                <br />
            </div>
        );
    } else {
        if (userReg) {
            scrum_db.createUser(firstName, lastName, email, userReg.userid);
            return (
                <div>
                    <p>Registered user: {userReg.email}</p>
                    <br />
                </div>);
        } else if (loadingReg) {
            return (
                <div>
                    <p>Loading...</p>
                    <br />
                </div>
            );
        } else if (errorReg) {
            return (
                <div>
                    <p>Error: {errorReg.message}</p>
                    <br />
                </div>
            );
        } else {
            return (
                <div className='registerMain'>
                    <form className='registerForm'>
                        <div className='registerHeader'>
                            Registration
                        </div>

                        <div className='input'>
                            <input type='text' name='user' placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}></input>
                        </div>

                        <div className='input'>
                            <input type='text' name='user' placeholder='Last Name' onChange={(e) => setLastName(e.target.value)}></input>
                        </div>

                        <div className='input'>
                            <input type='text' name='user' placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
                        </div>

                        <div className='input'>
                            <input type='text' name='user' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
                        </div>

                        <div className='input'>
                            <input type='text' name='user' placeholder='Re-Enter Password' onChange={(e) => setPassword2(e.target.value)}></input>
                        </div>

                        <button className='registerButton' onClick={() => createUserWithEmailAndPassword(email, password)}>
                            Register
                        </button>
                    </form>
                </div>
            );
        }
    }
}

export default Registration;
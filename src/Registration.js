import './Register.css';

function Registration(){
    return(
        <div className='registerMain'>
            <form className='registerForm'>
                <div className='registerHeader'>
                    Registration
                </div>

                <div className='input'>
                    <input type='text' name='fName' placeholder='First Name'></input>
                </div>

                <div className='input'>
                    <input type='text' name='lName' placeholder='Last Name'></input>
                </div>

                <div className='input'>
                    <input type='text' name='email' placeholder='Email'></input>
                </div>

                <div className='input'>
                    <input type='password' name='pword' placeholder='Password'></input>
                </div>

                <div className='input'>
                    <input type='password' name='pwordCheck' placeholder='Re-Enter Password'></input>
                </div>
                <button className='registerButton'>
                    Register
                </button>
            </form>
        </div>
    );
}

export default Registration;
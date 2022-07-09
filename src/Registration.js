import './Register.css';

function Registration(){
    return(


        <div className='registerMain'>
            <form className='registerForm'>
                <div className='registerHeader'>
                    Registration
                </div>

                <div className='input'>
                    <input type='text' name='user' placeholder='First Name'></input>
                </div>

                <div className='input'>
                    <input type='text' name='user' placeholder='Last Name'></input>
                </div>

                <div className='input'>
                    <input type='text' name='user' placeholder='Email'></input>
                </div>

                <div className='input'>
                    <input type='text' name='user' placeholder='Password'></input>
                </div>

                <div className='input'>
                    <input type='text' name='user' placeholder='Re-Enter Password'></input>
                </div>


                <button className='registerButton'>
                    Register
                </button>
            </form>
        </div>
    );
}

export default Registration;
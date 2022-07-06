import './Login.css';
import {}

function Login () {

    return (
        <div className='loginMain'>
           <form className='loginForm'>
            <div className='loginHeader'>
                Login
            </div>
            <div className='input'>
                <input type='text' name='user' placeholder='Email'>
                </input>
            </div>
            <div className='input'>
                <input type='password' name='pass' placeholder='Password'>
                </input>
            </div>

            <a href='/signup' className='smallText'> Sign Up</a>
            <br/>  
            <button className='loginButton'>
                Login
            </button>
           </form>
        </div>
    );
}

export default Login;
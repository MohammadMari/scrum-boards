import logo from './logo.svg';
import './App.css';
import { scrum_db } from './Database';

function App() {

  scrum_db.createUser("test", "test", "test@test.com", "password");
  scrum_db.authUser("test@test.com", "password");

  return (
    <div className='navbar'>
      <button className='navButton'>
        Dashboard
      </button>
      <button className='navButton'>
        Board
      </button>

    </div>
  );
}

export default App;

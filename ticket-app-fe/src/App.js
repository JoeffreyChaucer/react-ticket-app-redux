import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <div className='App container'>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign-in' element={<Login />} />
          <Route path='/sign-up' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

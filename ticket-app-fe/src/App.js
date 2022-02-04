import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className='App container'>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/sign-in' element={<Login />} />
            <Route path='/sign-up' element={<Register />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;

import React from 'react';

import '../css/App.css';
import Login from './Login'
import Home from './Home';

import PrivateRoute from './PrivateRoute.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/login">Login</Link>
        <Link to="/protected">Protected Page</Link>
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/protected" component={Home} />
      </div>
      
    </Router>
  );
}

export default App;

import React from 'react';

import '../css/App.css';
import Login from './Login'
import Registration from './Registration'
import Home from './Home';

import PrivateRoute from './PrivateRoute.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import styled from 'styled-components';
import plantcacti from '../assets/plant-cacti2.png';
import PlantsList from './PlantsList';

const AppStyles = styled.div`

`

const HeaderContainer = styled.div`
    font-family: 'Amatic SC', cursive;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100px;
    border-bottom: 1px solid black;
    background-image: url(${plantcacti});
    background-size: cover;
    opacity: 0.6;
    width: 100%;

    a {
      text-decoration: none;
      color: white;      
      text-shadow: 0 0 10px #3F7A1A;    
      
      
    } 
    h1 {
        font-size: 50px;
        @media(min-width: 800px) {
          font-size: 100px;
        }
      }

  
   


`

const HeaderNav = styled.div`   

    a {
        text-decoration: none;
        padding: 10px;  
        color: white;
        font-size: 25px;
        font-weight: 900;

            
    }
`

function App() {
  return (
    <Router>
      <AppStyles>
        <HeaderContainer>
          <div className="header-title">
            <Link to="/protected"><h1>Water My Plant</h1></Link>
          </div>
          <HeaderNav>
            <Link to="/login">Log In</Link>
            <Link to="/registration">Sign Up</Link>            
            </HeaderNav>
        </HeaderContainer>
                   
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <PrivateRoute exact path="/protected" component={Home} />


        
        </AppStyles>
      
    </Router>
  );
}

export default App;

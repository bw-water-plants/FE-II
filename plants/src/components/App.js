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
import Plant from './Plant';
import PlantAvatar from './PlantAvatar';
import UserProfile from './UserProfile';

const AppStyles = styled.div`

`

const HeaderContainer = styled.div`
    font-family: 'Amatic SC', cursive;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100px;
    border-bottom: 1px solid black;
    background-image: linear-gradient( rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${plantcacti});
    
    background-size: cover;

    width: 100%;

    a {
      text-decoration: none;
      color: white;      
      text-shadow: 0 0 10px #538b53;    
      
      
    } 
    h1 {
        font-size: 50px;
        text-shadow:
          -1px -1px 0 #555,
          1px -1px 0 #555,
          -1px 1px 0 #555,
          1px 1px 0 #555;

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

const AvatarCircle =  styled.div`
    background-color: white;
    border-radius: 100px;
    width: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 12px 10px 10px 10px;
    height: 45px;
`

const SameLineWelcome = styled.div`
    display: flex;
    flex-direction: row;
`

function App() {

  const isSignedIn = localStorage.getItem('token');
  const username = localStorage.getItem('username')  
  const avatarId = localStorage.getItem('avatarid')  

  return (
    <Router>
      <AppStyles>
        <HeaderContainer>
          <div className="header-title">
            <Link to="/protected"><h1>Water My Plants</h1></Link>
          </div>
          <HeaderNav>
          {!isSignedIn ? 
            <>
              <Link to="/login">Log In</Link>
              <Link to="/registration">Sign Up</Link>
            </>  
              : <SameLineWelcome>
                <Link to="/userprofile">Welcome {username} 
              

                </Link>
                <AvatarCircle> 
                      <PlantAvatar avatarId={avatarId} avatarHeight="35px" /> 
                </AvatarCircle> 
              </SameLineWelcome>
            }     
            </HeaderNav>
        </HeaderContainer>
                   
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Login} />
          <Route path="/registration" component={Registration} />
          <PrivateRoute exact path="/protected" component={Home} />
          <PrivateRoute exact path="/userprofile" component={UserProfile} />
          <Route
            path="/plant"
            render={props => (
            <Plant
              {...props}
            />)}
          />
        </AppStyles>
      
    </Router>
  );
}

export default App;

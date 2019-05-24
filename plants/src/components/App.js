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
  width: 100%;
`

const HeaderContainer = styled.div`
    font-family: 'Amatic SC', cursive;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100px;
    border-bottom: 1px solid #555;
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
          -2px -2px 0 #555,
          2px -2px 0 #555,
          -2px 2px 0 #555,
          2px 2px 0 #555;

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

const ContentWrapper = styled.div`
  margin-bottom: 200px;
`

const FooterContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  padding-bottom: 5px;
  font-family: 'Amatic SC', cursive;
  font-size: 23px;
  color: #538b53;
  text-align: center;
  background: white;
  
  
  /* display: flex;
  flex-direction: column;
  align-items: center; */


  
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

        
          <ContentWrapper>      
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
          </ContentWrapper>  

        <FooterContainer>
          <div>&copy; Water My Plants 2019</div>
          <div>Icons made by <a href="https://www.freepik.com/?__hstc=57440181.c0bfb091a5e7e4204b404268ab216eb9.1558661494975.1558661494975.1558661494975.1&__hssc=57440181.6.1558661494975&__hsfp=164341980" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 		    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 		    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

        </FooterContainer>
        </AppStyles>
      
    </Router>
  );
}

export default App;

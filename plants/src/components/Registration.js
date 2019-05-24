import React from 'react';
import { connect } from 'react-redux';
import { registration, login } from '../actions/actions';
import Loader from "react-loader-spinner";
import styled from 'styled-components';

import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';
import image5 from '../assets/5.png';
import image6 from '../assets/6.png';

const SignUpStyles = styled.div`
    width: 275px;
    height: 550px;
    background-color: whitesmoke;
    margin: 50px auto;
    border-radius: 15px;    
`

const SignUpForm = styled.form`
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    width: 250px;
    margin: 0 auto;
    

    input {
        margin: 10px auto;
        height: 35px;
        width: 90%;
        border: none;
        border-radius: 20px;
        padding-top: 5px;
        font-size: 25px;
        color: hsla(149, 35%, 45%, 1);
        text-align: center;
        

        :first-child {
            margin-top: 25px;
        }    

        ::placeholder {
            font-size: 25px;
            text-align: center; 
            color: hsla(149, 35%, 45%, 1);       
        }

    }
`

const AvatarIconsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px auto;
`

const IconBox = styled.div`
    display: flex;
`

const Icon = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-content: center;
    
    input [type=radio] {
        padding-left: 10px;
    }    
`

const SignUpButton = styled.button`
    position:relative;
    padding: 10px 20px;  
    border: 1px solid hsla(210, 50%, 85%, 1);
    background: none;
    cursor: pointer;
    width: 60%;
    margin: 0 auto;
    
    /* margin: 10px auto 0; */
    
    font-family: 'Amatic SC', cursive;
    font-weight: 900;
    /* text-transform: uppercase; */
    font-size: 25px;  
    color: white;
    
    background-color: hsl(210, 80%, 42%);
    box-shadow: hsla(210, 40%, 52%, .4) 2px 2px 22px;
    border-radius: 20px; 
    z-index: 0;  
    overflow: hidden;   

    ::before {
        content: '';
        pointer-events: none;
        opacity: .6;
        background:
            radial-gradient(circle at 20% 35%,  transparent 0,  transparent 2px, hsla(210, 50%, 85%, 1) 3px, hsla(210, 50%, 85%, 1) 4px, transparent 4px),
            radial-gradient(circle at 75% 44%, transparent 0,  transparent 2px, hsla(210, 50%, 85%, 1) 3px, hsla(210, 50%, 85%, 1) 4px, transparent 4px),
            radial-gradient(circle at 46% 52%, transparent 0, transparent 4px, hsla(210, 50%, 85%, 1) 5px, hsla(210, 50%, 85%, 1) 6px, transparent 6px);

        width: 100%;
        height: 300%;
        top: 0;
        left: 0;
        position: absolute;
        animation: bubbles 5s linear infinite both;

        @keyframes bubbles {
            from {
                transform: translate();
            }
            to {
                transform: translate(0, -66.666%);
            }
        }

}
`

class Registration extends React.Component {

    state = {
        credentials: {
            username: '',
            password: '',
            phoneNumber: '',
            avatar_id: '',
            useTwilio: false,
            timeZone: 'American/Chicago'
        }
    }

    handleChange = e => {
        this.setState({ 
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
                }
            })
    }

    registration = e => {
        e.preventDefault();
        this.props.registration(this.state.credentials)
        .then(() => {
            this.props.login(this.state.credentials).then(() => {
                this.props.history.push('/protected');
              });
          });
    };

    handleOptionChange = e => {
        this.setState({
            ...this.state,
          credentials: {
              ...this.state.credentials,
            avatar_id: e.target.value
            }
        });
    };

    handleCheckboxChange = event => {


        this.setState({ 
            ...this.state,
            credentials: {
                ...this.state.credentials,
              useTwilio: event.target.checked
              }
         }) 
    }

    render(){
        return (
            <SignUpStyles>
                <SignUpForm onSubmit={this.registration}>
                    <input 
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={this.state.credentials.phoneNumber}
                        onChange={this.handleChange}
                    /><br />
                    Text Notifications: <input 
                        type="checkbox"
                        name="useTwilio"
                        checked={this.state.credentials.useTwilio}
                        onChange={this.handleCheckboxChange }
                    />
                    <AvatarIconsWrapper>
                        <IconBox>
                            <Icon>
                                <img src={image1} height="50px" /><br />
                                <input
                                    type="radio"
                                    value="1"
                                    onChange={this.handleOptionChange}
                                    checked={this.state.credentials.avatar_id === '1'} 
                                />
                            </Icon>
                            <Icon>
                                <img src={image2} height="50px" /><br />
                                <input 
                                    type="radio"
                                    value="2"
                                    onChange={this.handleOptionChange}
                                    checked={this.state.credentials.avatar_id === '2'} 
                                />
                            </Icon>
                            <Icon>
                                <img src={image3} height="50px" /><br />
                                <input 
                                    type="radio"
                                    value="3"
                                    onChange={this.handleOptionChange}
                                    checked={this.state.credentials.avatar_id === '3'} 
                                />
                            </Icon>
                        </IconBox>
                        <IconBox>
                            <Icon>
                                <img src={image4} height="50px" /><br />
                                <input 
                                    type="radio"
                                    value="4"
                                    onChange={this.handleOptionChange}
                                    checked={this.state.credentials.avatar_id === '4'} 
                                />
                            </Icon>
                            <Icon>
                                <img src={image5} height="50px" /><br />
                                <input 
                                    type="radio"
                                    value="5"
                                    onChange={this.handleOptionChange}
                                    checked={this.state.credentials.avatar_id === '5'} 
                                />
                            </Icon>
                            <Icon>
                                <img src={image6} height="50px" /><br />
                                <input 
                                    type="radio"
                                    value="6"
                                    onChange={this.handleOptionChange}
                                    checked={this.state.credentials.avatar_id === '6'} 
                                />
                            </Icon>
                        </IconBox>
                    </AvatarIconsWrapper>


                    <SignUpButton>
                        {this.props.isRegistering 
                            ? <Loader type="ThreeDots" color="#FFFFFF" height="25" width="50" /> 
                            : "Sign Up"}
                    </SignUpButton>
                </SignUpForm>
            </SignUpStyles>
        )
    }

}
const mapStateToProps = state => ({
    isRegistering: state.auth.isRegistering,
    user: state.user.user
})

export default connect(mapStateToProps, { registration, login, })(Registration)
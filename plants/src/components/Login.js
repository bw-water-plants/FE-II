import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/actions';
import Loader from "react-loader-spinner";
import styled from 'styled-components';
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

const LoginStyles = styled.div`
    width: 275px;
    height: 240px;
    background-color: whitesmoke;
    margin: 50px auto;
    border-radius: 15px;
`

const LoginForm = styled.form`
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    width: 250px;
    margin: 0 auto;

    input {
        margin: 10px;
        height: 35px;        
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
const LoginButton = styled.button`
    position:relative;
    padding: 10px 20px;  
    border: 1px solid hsla(210, 50%, 85%, 1);
    background: none;
    cursor: pointer;
    width: 60%;
    margin: 20px auto;
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

class Login extends React.Component {

    state = {
        credentials: {
            username: '',
            password: ''
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

    login = e => {
        e.preventDefault();
        this.props.login(this.state.credentials)
        .then(() => {
            this.props.history.push('/protected');
            history.go(0)
          });
    };

    render(){
        return (
            <LoginStyles>
                <LoginForm onSubmit={this.login}>
                    <input 
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text"
                        name="password"
                        placeholder="Password"
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />
                    <LoginButton>
                    {this.props.isLoggingIn 
                            ? <Loader type="ThreeDots" color="#FFFFFF" height="25" width="50" /> 
                            : "Log In"}
                    </LoginButton>
                </LoginForm>
            </LoginStyles>
        )
    }

}
const mapStateToProps = state => ({
    isLoggingIn: state.auth.isLoggingIn
})
export default connect(mapStateToProps, { login })(Login)
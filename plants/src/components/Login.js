import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/actions';
import Loader from "react-loader-spinner";
import styled from 'styled-components';

const LoginStyles = styled.div`
    width: 275px;
    height: 250px;
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
                    <button>
                    {this.props.isLoggingIn 
                            ? <Loader type="ThreeDots" color="#00BFFF" height="25" width="50" /> 
                            : "Log In"}
                    </button>
                </LoginForm>
            </LoginStyles>
        )
    }

}
const mapStateToProps = state => ({
    isLoggingIn: state.auth.isLoggingIn
})
export default connect(mapStateToProps, { login })(Login)
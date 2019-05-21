import React from 'react';
import { connect } from 'react-redux';
import { registration, login } from '../actions/actions';
import Loader from "react-loader-spinner";
import styled from 'styled-components';

const SignUpStyles = styled.div`
    width: 275px;
    height: 300px;
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
        margin: 10px;
        height: 35px;
        border: none;
        border-radius: 20px;
        padding-top: 5px;
        

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

class Registration extends React.Component {

    state = {
        credentials: {
            username: '',
            password: '',
            phoneNumber: ''
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
                    />
                    <button>
                        {this.props.isRegistering 
                            ? <Loader type="ThreeDots" color="#00BFFF" height="25" width="50" /> 
                            : "Sign Up"}
                    </button>
                </SignUpForm>
            </SignUpStyles>
        )
    }

}
const mapStateToProps = state => ({
    isRegistering: state.auth.isRegistering,
})
export default connect(mapStateToProps, { registration, login })(Registration)
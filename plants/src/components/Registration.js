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

class Registration extends React.Component {

    state = {
        credentials: {
            username: '',
            password: '',
            phoneNumber: '',
            avatar_id: '',
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
                    <div>
                        <div>
                            <img src={image1} height="50px" /><br />
                            <input 
                                type="radio"
                                value="1"
                                onChange={this.handleOptionChange}
                                checked={this.state.credentials.avatar_id === '1'} 
                            />
                        </div>
                        <div>
                            <img src={image2} height="50px" /><br />
                            <input 
                                type="radio"
                                value="2"
                                onChange={this.handleOptionChange}
                                checked={this.state.credentials.avatar_id === '2'} 
                            />
                        </div>
                        <div>
                            <img src={image3} height="50px" /><br />
                            <input 
                                type="radio"
                                value="3"
                                onChange={this.handleOptionChange}
                                checked={this.state.credentials.avatar_id === '3'} 
                            />
                        </div>
                        <div>
                            <img src={image4} height="50px" /><br />
                            <input 
                                type="radio"
                                value="4"
                                onChange={this.handleOptionChange}
                                checked={this.state.credentials.avatar_id === '4'} 
                            />
                        </div>
                        <div>
                            <img src={image5} height="50px" /><br />
                            <input 
                                type="radio"
                                value="5"
                                onChange={this.handleOptionChange}
                                checked={this.state.credentials.avatar_id === '5'} 
                            />
                        </div>
                        <div>
                            <img src={image6} height="50px" /><br />
                            <input 
                                type="radio"
                                value="6"
                                onChange={this.handleOptionChange}
                                checked={this.state.credentials.avatar_id === '6'} 
                            />
                        </div>
                    </div>


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
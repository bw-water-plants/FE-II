import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/actions';
import Loader from "react-loader-spinner";

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
            <div>
                <form onSubmit={this.login}>
                    <input 
                        type="text"
                        name="username"
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text"
                        name="password"
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />
                    <button>
                    {this.props.isLoggingIn 
                            ? <Loader type="ThreeDots" color="#00BFFF" height="25" width="50" /> 
                            : "Login"}
                    </button>
                </form>
            </div>
        )
    }

}
const mapStateToProps = state => ({
    isLoggingIn: state.auth.isLoggingIn
})
export default connect(mapStateToProps, { login })(Login)
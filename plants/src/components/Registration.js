import React from 'react';
import { connect } from 'react-redux';
import { registration } from '../actions/actions';
import Loader from "react-loader-spinner";

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
            this.props.history.push('/protected');
          });
    };

    render(){
        return (
            <div>
                <form onSubmit={this.registration}>
                    Username:<input 
                        type="text"
                        name="username"
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                    />< br />
                    Password<input 
                        type="password"
                        name="password"
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />< br />
                    Phone Number<input 
                        type="text"
                        name="phoneNumber"
                        value={this.state.credentials.phoneNumber}
                        onChange={this.handleChange}
                    />< br />
                    <button>
                        {this.props.isRegistering 
                            ? <Loader type="ThreeDots" color="#00BFFF" height="25" width="50" /> 
                            : "Registration"}
                    </button>
                </form>
            </div>
        )
    }

}
const mapStateToProps = state => ({
    isRegistering: state.isRegistering
})
export default connect(mapStateToProps, { registration })(Registration)
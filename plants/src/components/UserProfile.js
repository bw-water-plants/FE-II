import React from 'react';
import { connect } from 'react-redux';
import { getUser, updateUser} from '../actions/actions';
import { withRouter } from 'react-router-dom';
import Loader from "react-loader-spinner";

class UserProfile extends React.Component {

    state = {
        updatingUser: false,
        userId: localStorage.getItem('id'),
        formData: {
            username: '',
            phoneNumber: '',
        }
    }

    componentDidMount() {
        this.getUser();
        
    }

    getUser() { 
    console.log(this.state.userId)
        this.props.getUser(this.state.userId)
            .then(() => {
            this.setState({
                ...this.state,
                formData: {
                    username: this.props.user.username,
                    phoneNumber: this.props.user.phoneNumber
                    }
                });
        });
    }

    toggleForm(){ 
        console.log('toggling form')
        this.setState({
            ...this.state,
            updatingUser: !this.state.updatingUser
        })
    }

    handleChange = e => {
        this.setState({
          formData: {
            ...this.state.formData,
            [e.target.name]: e.target.value
          }
        });
      };

    handleUpdateUser = () => {
        this.props.updateUser(this.props.user.id, this.state.formData)
        .then(this.toggleForm(), this.getUser())
        .then(() => {
            this.props.history.push('/protected');
          });
    }

    logout() {

        localStorage.clear('id')
        localStorage.clear('token')
        localStorage.clear('username')
        this.props.history.push("/login");
        
    }

    render() {
        return (
            <div>
            {!this.state.updatingUser ? 
                <div>
                    <div>{this.props.user.username}</div>
                    <div>{this.props.user.phoneNumber}</div>
                    <button onClick={() => this.toggleForm()}>Update</button>
                    <button onClick={() => this.logout()}>Logout</button>
                </div>
                :
                <div>
                    <form>
                        <input
                            type="text"
                            name="username"
                            value={this.state.formData.username}
                            onChange={this.handleChange}
                            /><br />
                        <input
                            type="text"
                            name="phoneNumber"
                            value={this.state.formData.phoneNumber}
                            onChange={this.handleChange}
                            /><br />
                    </form>
                <button onClick={() => this.handleUpdateUser()}>Confirm</button>
                <button onClick={() => this.toggleForm()}>Cancel</button>
            </div>
            }
             </div>
        )
    }
}

const mapStateToProps = state => ({
    userId: state.auth.userId,
    user: state.user.user
})

export default connect(mapStateToProps, { getUser, updateUser })(withRouter(UserProfile))
import React from 'react';
import { connect } from 'react-redux';
import { getUser, updateUser} from '../actions/actions';
import { withRouter } from 'react-router-dom';
import Loader from "react-loader-spinner";
import styled from 'styled-components';
import createHistory from 'history/createBrowserHistory'
const history = createHistory();

const UserInfoStyles = styled.div`

`

const UserInfo = styled.div`
    text-align: center;
    margin-top: 30px;
`

const UserWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const UserButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
`

const UserButton = styled.button`
    border: none;
    background-color: white;
    font-family: 'Amatic SC', cursive;
    color: #538b53;
    font-size: 25px;
    font-weight: 600;
    cursor: pointer;
`

const Info = styled.div`

    strong {
        font-family: 'Amatic SC', cursive;
        font-size: 25px;
        letter-spacing: 2px;
        
    }
`

class UserProfile extends React.Component {

    state = {
        updatingUser: false,
        userId: localStorage.getItem('id'),
        formData: {
            username: '',
            phoneNumber: '',
            useTwilio: ''
            
        }
    }

    componentDidMount() {
        this.getUser();
        
    }   

    getUser() { 

        this.props.getUser(this.state.userId)
            .then(() => {
            this.setState({
                ...this.state,
                formData: {
                    username: this.props.user.username,
                    phoneNumber: this.props.user.phoneNumber,
                    useTwilio: this.props.user.useTwilio
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
            this.props.history.push('/userprofile');
          });
    }

    logout() {

        localStorage.clear('id')
        localStorage.clear('token')
        localStorage.clear('username')
        this.props.history.push("/login");
        history.go(0)
        
    }

    handleCheckboxChange = event => {


        this.setState({ 
            ...this.state,
            formData: {
                ...this.state.credentials,
              useTwilio: event.target.checked
              }
         }) 
    }

    render() {
        return (
            <UserInfoStyles>
                
            {!this.state.updatingUser ? 
                <UserWrapper>

                    <UserInfo>
                        <Info><strong>Username: </strong>{this.props.user.username}</Info>
                        <Info><strong>Phone Number: </strong>{this.props.user.phoneNumber}</Info>
                        <Info><strong>Recieving Reminders: </strong>{this.props.user.useTwilio ? "Enabled" : "Disabled"}</Info>
                        <UserButtonsWrapper>
                            <UserButton onClick={() => this.toggleForm()}>Update User Info</UserButton>
                            <UserButton onClick={() => this.logout()}>Logout</UserButton>
                        </UserButtonsWrapper>
                    </UserInfo>
                </UserWrapper>
                
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
                 Text Notifications: <input 
                        type="checkbox"
                        name="useTwilio"
                        checked={this.state.formData.useTwilio}
                        onChange={this.handleCheckboxChange }
                            />
                    </form>
                <button onClick={() => this.handleUpdateUser()}>Confirm</button>
                <button onClick={() => this.toggleForm()}>Cancel</button>
            </div>
            }
            </UserInfoStyles>
        )
    }
}

const mapStateToProps = state => ({
    userId: state.auth.userId,
    user: state.user.user
})

export default connect(mapStateToProps, { getUser, updateUser })(withRouter(UserProfile))
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
const UserForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-top: 20px;

    h3 {
        font-family: 'Amatic SC', cursive;
        color: #538b43;
        font-size: 30px;
    }

    input {
        border:3px solid #538b53;
        width: 250px;
        height: 50px;
        border-radius: 20px;
        font-size: 25px; 
        color: #538b53;
        text-align: center;

        ::placeholder {
            color: #538b53;
            font-size: 25px;
            text-align: center;
        }


    }
`

const EditUserButtonsWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const EditUserButton = styled.button`
    position:relative;
    padding: 10px 20px;  
    border: 1px solid hsla(210, 50%, 85%, 1);
    background: none;
    cursor: pointer;
    
    
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
                        <Info><strong>Use Twilio: </strong>{this.props.user.useTwilio ? "Yes" : "No"}</Info>
                        <UserButtonsWrapper>
                            <UserButton onClick={() => this.toggleForm()}>Update User Info</UserButton>
                            <UserButton onClick={() => this.logout()}>Logout</UserButton>
                        </UserButtonsWrapper>
                    </UserInfo>
                </UserWrapper>
                
                :
                <div>
                    <UserForm>
                        <h3>Edit User Info</h3>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={this.state.formData.username}
                            onChange={this.handleChange}
                            /><br />
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={this.state.formData.phoneNumber}
                            onChange={this.handleChange}
                            /><br />
                 Use Twilio: <input 
                        type="checkbox"
                        name="useTwilio"
                        checked={this.state.formData.useTwilio}
                        onChange={this.handleCheckboxChange }
                            />
                    </UserForm>
                    <EditUserButtonsWrapper>
                        <EditUserButton onClick={() => this.handleUpdateUser()}>Confirm</EditUserButton>
                        <EditUserButton onClick={() => this.toggleForm()}>Cancel</EditUserButton>
                    </EditUserButtonsWrapper>
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
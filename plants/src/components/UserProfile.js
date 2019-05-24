import React from 'react';
import { connect } from 'react-redux';
import { getUser, updateUser} from '../actions/actions';
import { withRouter, Link } from 'react-router-dom';
import Loader from "react-loader-spinner";
import styled from 'styled-components';
import PlantAvatar from './PlantAvatar';
import createHistory from 'history/createBrowserHistory'
const history = createHistory();

const UserInfoStyles = styled.div`
    width: 500px;
    margin: 45px auto;
    padding: 25px;
    background-color: whitesmoke;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const UsernameBanner = styled.div`
    font-family: 'Amatic SC', cursive;
    font-size: 48px;
    font-weight: 900;
    color: #1f2123;
`

const AvatarCircle =  styled.div`
    background-color: #538b53;
    border-radius: 100px;
    width: 65px;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 12px 10px 0px 10px;

    :hover{
      background-color: #6eb26e;
    }
`

const UserInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
`

const UserWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const UserButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 55px;
    margin-right: 15px;

`

const UserButton = styled.button`
    border: none;
    font-family: 'Amatic SC', cursive;
    color: #538b53;
    font-size: 25px;
    font-weight: 600;
    cursor: pointer;
    background-color: whitesmoke;

    :hover{
        color: #6eb26e;
    }
`

const BackButton = styled.div`
    font-size: 25px;
    color: #538b53;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    height: 35px;
    
    a:visited {
        color: #538b53;
    }

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
    width: 100%;

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
    padding-top: 25px;
`

const FormLabel = styled.div`
    text-align: center;
    font-size: 18px;
    margin: 0 20px;
    color: #1f2123;

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
const LeftSide = styled.div`
    display: flex;
    width: 50%;
    flex-direction: column;
    align-items: flex-end;
    font-size: 18px;
`

const RightSide = styled.div`
    display: flex;
    width: 50%;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 15px;
    font-size: 18px;
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

            this.props.history.push('/UserProfile');

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

        const avatarId = localStorage.getItem('avatarid')  


        return (
            <UserInfoStyles>

            {!this.state.updatingUser ? 
                <UserWrapper>
                <BackButton><Link to="/protected"><i className="fas fa-arrow-circle-left"></i></Link></BackButton>
                  <AvatarCircle> 
                        <PlantAvatar avatarId={avatarId} avatarHeight="65px" /> 
                  </AvatarCircle> 
                  <UsernameBanner>{this.props.user.username}</UsernameBanner>
                    <UserInfo>
                        <LeftSide>
                            <strong>Phone Number: </strong>
                            <strong>Recieving Reminders: </strong>
                            <strong>GreenThumb Score: </strong>
                        </LeftSide>
                        <RightSide>
                            <Info>{this.props.user.phoneNumber}</Info>
                            <Info>{this.props.user.useTwilio ? "Enabled" : "Disabled"}</Info>
                            <Info>28</Info>
                        </RightSide>
                        
                        <UserButtonsWrapper>
                            <UserButton onClick={() => this.toggleForm()}><i className="fas fa-edit"></i>Update</UserButton><br />
                            <UserButton onClick={() => this.logout()}><i className="fas fa-door-open"></i>Logout</UserButton>
                        </UserButtonsWrapper>
                    </UserInfo>
                </UserWrapper>
                
                :
                <UserForm>
                    <BackButton><i className="fas fa-arrow-circle-left" onClick={() => this.toggleForm()}></i></BackButton>
                        
                            <UsernameBanner>Edit User Info</UsernameBanner>
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
                            <FormLabel>Text Notifications:</FormLabel> <input 
                                type="checkbox"
                                name="useTwilio"
                                checked={this.state.formData.useTwilio}
                                onChange={this.handleCheckboxChange }
                                />
                        
                        <EditUserButtonsWrapper>
                            <EditUserButton onClick={() => this.handleUpdateUser()}>Confirm</EditUserButton>
                            <EditUserButton onClick={() => this.toggleForm()}>Cancel</EditUserButton>
                        </EditUserButtonsWrapper>
                        </UserForm>
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
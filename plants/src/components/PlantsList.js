import React from 'react';
import { connect } from 'react-redux';
import { getPlants, createPlant, createTwilio } from '../actions/actions';
import Loader from "react-loader-spinner";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PlantAvatar from './PlantAvatar';
import Countdown from 'react-countdown-now';

import image7 from '../assets/7.png';
import image8 from '../assets/8.png';
import image9 from '../assets/9.png';
import image10 from '../assets/10.png';
import image11 from '../assets/11.png';
import image12 from '../assets/12.png';
import image13 from '../assets/13.png';
import image14 from '../assets/14.png';
import image15 from '../assets/15.png';
import image16 from '../assets/16.png';

const NewPlantWrapper = styled.div`
    margin: 0 auto;
    
`

const PlantWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    /* justify-content: center; */
    
    width: 95%;
    margin: 30px 0;
    flex-wrap: wrap;
    
    
    a {        
        text-decoration: none;        
        padding-bottom: 20px;

        &:visited {
            color: #538b53;
        }
    }
`

const PlantLink = styled.div`
    display: flex;
    justify-content: center;
    width: 40%;
    text-align: center;
    font-size: 36px;
    font-family: 'Amatic SC', cursive;
    font-weight: bold;
`

const NewPlantForm = styled.form`
    /* margin-bottom: 200px; */
    input {
        margin: 0 auto;
    }
`

const PlantInput = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    
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

const PlantIcons = styled.div`
    display: flex;
    flex-direction: column;
    /* margin: 0 auto; */
`
const IconGroup = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px;
`

const Icon = styled.div`
    display: flex;
    flex-direction: column;

    img {
        vertical-align: middle;
    }

    input {
        vertical-align: middle;
    }    
    
`

const NewPlantButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px auto 0;
    width: 250px;
`
const NewPlantButton = styled.button`
    background-color: #538b53;
    color: white;
    border: 2px solid white;
    width: 100px;
    margin: 5px;
    height: 35px;
    border-radius: 15px;
    font-size: 20px;
    

    &:hover {
        background-color: white;
        color: #538b53;
        border: 2px solid #538B53;
    }
    
`

const AddPlant = styled.div`
    display: flex;
    justify-content: center;
`

const AddPlantButton = styled.button`
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

const WaterTime = styled.div`
    background-color: hsl(210,80%,42%);
    width: 75px;
    color: white;
    border-radius: 5px;
    font-size: 12px;
    padding: 5px;
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    margin: 0 auto;
`

class PlantsList extends React.Component {

    state = {
        isAddingPlant: false,
        newPlant: {
            plantName: '',
            dailyWaterTime: '',
            user_id: localStorage.getItem('id'),
            plant_avatar_id: ''
        }
    }

    componentDidMount() {
       this.props.getPlants(localStorage.getItem('id'))
   
    }

    handleChange = e => {
        this.setState({
            newPlant: {
            ...this.state.newPlant,
            [e.target.name]: e.target.value
          }
        });
      };


    addPlant = e => {
        debugger;
        this.props.createPlant(this.state.newPlant)
        //new Date('August 19, 1975 23:15:30 GMT+07:00');
        let date = new Date(); 
        
        let datestring = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()} ${this.state.newPlant.dailyWaterTime}`
        let date2 = new Date(datestring)
        let datestring2 = `${date2.getUTCMonth()+1}-${date2.getUTCDate()}-${date2.getUTCFullYear()} ${date2.getUTCHours()}:${date2.getUTCMinutes()}`

        if(this.props.user.useTwilio){
            const twilioObject = {
                "plantName": this.state.newPlant.plantName,
                "timeZone": "America/Chicago",
                "time": datestring2,
                "phoneNumber": this.props.user.phoneNumber,
                "user_id": this.props.user.user_id
            }
            this.props.createTwilio(twilioObject)
        }

    }
    
    toggleAddPlantForm() {
        this.setState({
            ...this.state,
            isAddingPlant: !this.state.isAddingPlant
        });
    };

    handleOptionChange = e => {
        this.setState({
            ...this.state,
          newPlant: {
              ...this.state.newPlant,
            plant_avatar_id: e.target.value
            }
        });
    };

    avatarPicker = avatarId => {
        switch(avatarId) {
            case 7:
                return image7;
            case 8:
                return image8;
            case 9:
                return image9;
            case 10:
                return image10;
            case 11:
                return image11;
            case 12:
                return image12;
            case 13:
                return image13;
            case 14:
                return image14;
            case 15:
                return image15;
            case 16:
                return image16;
            default: 
                return image7;
        }
    }

    render() {



        const renderer = ({ hours, minutes, seconds, completed }) => {
            if (completed) {
                return null
            } else {
              // Render a countdown
              return <WaterTime>Water In:<br />{hours}:{minutes}:{seconds}</WaterTime>;
            }
          };

        const date = new Date()
        var monthNames = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
          ];
        const currentDate = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()
    
        
        return (
            <NewPlantWrapper>
                <PlantWrapper>
                    {this.props.plants.map(plant =>(
                        <PlantLink key={plant.id}>
                        <Link to={{
                            pathname: '/plant',
                            plantState: plant
                        }}>
                            <div key={plant.id}>
                                <PlantAvatar avatarId={plant.plant_avatar_id} avatarHeight="50px" /><br />
                                {plant.plantName}<br />
                                {/* {plant.dailyWaterTime}<br /> */}
                                <Countdown date={new Date(currentDate + " " + plant.dailyWaterTime)} renderer={ renderer }/>
                                
                            </div>

                        </Link>
                        </PlantLink>
                        
                    ) )}
                </PlantWrapper>
                {this.state.isAddingPlant ? 
                    
                                   
                        <NewPlantForm>
                            <PlantInput>
                                <input
                                    type="text"
                                    name="plantName"
                                    value={this.state.newPlant.plantName}
                                    placeholder="Plant Name"
                                    onChange={this.handleChange}
                                    /><br />
                                <input
                                    type="time"
                                    name="dailyWaterTime"
                                    value={this.state.newPlant.dailyWaterTime}
                                    placeholder="Water Time"
                                    onChange={this.handleChange}
                                    /><br />
                            </PlantInput>
                            <PlantIcons>
                                <IconGroup>
                                    <Icon><img src={image7} height="50px" alt={image7}/><br /><input type="radio" value="7" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '7'}  />
                                    </Icon>
                                    <Icon><img src={image8} height="50px" alt={image8}/><br /><input type="radio" value="8" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '8'}  />
                                    </Icon>
                                    <Icon><img src={image9} height="50px" alt={image9}/><br /><input type="radio" value="9" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '9'}  />
                                    </Icon>
                                    <Icon><img src={image10} height="50px" alt={image10}/><br /><input type="radio" value="10" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '10'}  />
                                    </Icon>
                                    <Icon><img src={image11} height="50px" alt={image11}/><br /><input type="radio" value="11" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '11'}  />
                                    </Icon>
                                </IconGroup>
                                <IconGroup> 
                                    <Icon><img src={image12} height="50px" alt={image12}/><br /><input type="radio" value="12" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '12'}  />
                                    </Icon>
                                    <Icon><img src={image13} height="50px" alt={image13}/><br /><input type="radio" value="13" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '13'}  />
                                    </Icon>
                                    <Icon><img src={image14} height="50px" alt={image14}/><br /><input type="radio" value="14" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '14'}  />
                                    </Icon>
                                    <Icon><img src={image15} height="50px" alt={image15}/><br /><input type="radio" value="15" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '15'}  />
                                    </Icon>
                                    <Icon><img src={image16} height="50px" alt={image16}/><br /><input type="radio" value="16" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '16'}  /> 
                                    </Icon>              
                                </IconGroup>
                            </PlantIcons>
                            <NewPlantButtonWrapper>
                                <NewPlantButton onClick={(e) => this.addPlant(e)}>Submit</NewPlantButton>
                                <NewPlantButton onClick={() => this.toggleAddPlantForm()}>Cancel</NewPlantButton>
                            </NewPlantButtonWrapper>
                        </NewPlantForm>
                        

                : 
                <AddPlant>
                    <AddPlantButton onClick={() => this.toggleAddPlantForm()}>Add New Plant</AddPlantButton>
                </AddPlant>
                }
            
            </NewPlantWrapper>
        )
    }
}

const mapStateToProps = state => ({
    plants: state.plant.plants,
    user: state.user.user
})


export default connect(mapStateToProps, { getPlants, createPlant, createTwilio })(PlantsList)
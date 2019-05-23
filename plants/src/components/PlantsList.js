import React from 'react';
import { connect } from 'react-redux';
import { getPlants, createPlant } from '../actions/actions';
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


    addPlant() {
        this.props.createPlant(this.state.newPlant)
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

        }
    }

    render() {

        const renderer = ({ hours, minutes, seconds, completed }) => {
            if (completed) {
                return "Water Me!"
            } else {
              // Render a countdown
              return <span>Water Me In: {hours}:{minutes}:{seconds}</span>;
            }
          };

        const userId = localStorage.getItem('id');
        const date = new Date()
        var monthNames = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
          ];
        const currentDate = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()
        console.log(currentDate)

        return (
            <div>
                {this.props.plants.map(plant =>(
                    <Link to={{
                        pathname: '/plant',
                        plantState: plant
                      }}>
                        <div key={plant.id}>
                            <PlantAvatar plantAvatarId={plant.plant_avatar_id} avatarHeight="50px" /><br />
                            {plant.plantName}<br />
                            {plant.dailyWaterTime}<br />
                            <Countdown date={new Date(currentDate + " " + plant.dailyWaterTime)} renderer={ renderer }/>,
                        </div>
                    </Link>
                ) )}

                {this.state.isAddingPlant ? 
                    
                    <div>                    
                        <form>
                            <input
                                type="text"
                                name="plantName"
                                value={this.state.newPlant.plantName}
                                placeholder="Plant Name"
                                onChange={this.handleChange}
                                /><br />
                            <input
                                type="text"
                                name="dailyWaterTime"
                                value={this.state.newPlant.dailyWaterTime}
                                placeholder="Water Time"
                                onChange={this.handleChange}
                                /><br />
                            <div>
                                    <img src={image7} height="50px" /><br /><input type="radio" value="7" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '7'} /><br />
                                    <img src={image8} height="50px" /><br /><input type="radio" value="8" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '8'} /><br />
                                    <img src={image9} height="50px" /><br /><input type="radio" value="9" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '9'} /><br />
                                    <img src={image10} height="50px" /><br /><input type="radio" value="10" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '10'} /><br />
                                    <img src={image11} height="50px" /><br /><input type="radio" value="11" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '11'} /><br />
                                    <img src={image12} height="50px" /><br /><input type="radio" value="12" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '12'} /><br />
                                    <img src={image13} height="50px" /><br /><input type="radio" value="13" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '13'} /><br />
                                    <img src={image14} height="50px" /><br /><input type="radio" value="14" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '14'} /><br />
                                    <img src={image15} height="50px" /><br /><input type="radio" value="15" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '15'} /><br />
                                    <img src={image16} height="50px" /><br /><input type="radio" value="16" onChange={this.handleOptionChange} checked={this.state.newPlant.plant_avatar_id === '16'} /><br />               
                            </div>
                             <button onClick={() => this.addPlant()}>Submit</ button>
                            <button onClick={() => this.toggleAddPlantForm()}>Cancel</button>
                        </form>
                    </div>

                : <button onClick={() => this.toggleAddPlantForm()}>Add New Plant</button>}
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    plants: state.plant.plants
})


export default connect(mapStateToProps, { getPlants, createPlant })(PlantsList)
import React from 'react';
import { connect } from 'react-redux';
import { getPlant, updatePlant, deletePlant } from '../actions/actions';
import PlantAvatar from './PlantAvatar';
import styled from 'styled-components';

const PlantWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 30px;

    img {
        width: 100px;
    }

    h3 {
        font-family: 'Amatic SC', cursive;
        font-size: 35px;
        color: #538b53;
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

const PlantButtonsWrapper = styled.div`
    margin-top: 20px;
`

const EditPlantButton = styled.button`
    border: none;
    color: #538b53;
    font-size: 25px;
    cursor: pointer;
    background: none;
`

class Plant extends React.Component {

    state = {
        updatingPlant: false, 
        plantid: '',
        isUpdatingPlant: false, 
        formData: {
            plantName: '',
            dailyWaterTime: '',
        }
    };

    componentDidMount() {

        console.log(this.props.location.plantState)
        const plant = this.props.location.plantState

        this.setState({
            ...this.state,
            plantid: plant.id,
            plantAvatarId: plant.plant_avatar_id,
            formData: {
                plantName: plant.plantName,
                dailyWaterTime: plant.dailyWaterTime
            }
        })
    }
    
    removePlant = id => {
        this.props.deletePlant(id)
        .then(() => {
            this.props.history.push('/protected');
         });
    };

    toggleForm() {
        console.log('toggling form')
        this.setState({
            ...this.state,
            isUpdatingPlant: !this.state.isUpdatingPlant
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

    handleEditPlant() {
        console.log(this.props);

         this.props.updatePlant( this.state.plantid, this.state.formData)
         .then(() => {
            this.props.history.push('/protected');

         });
    }

    render() {        

        return(
            <div>
                <PlantWrapper>
                    <PlantAvatar avatarId={this.state.plantAvatarId} avatarHeight="100px" />
                    {!this.state.isUpdatingPlant ?
                    <div>
                        <h3> {this.state.formData.plantName}</h3>
                        <WaterTime><span>Watering Time: {this.state.formData.dailyWaterTime}</span></WaterTime>
                        <PlantButtonsWrapper>
                            <EditPlantButton onClick={() => this.toggleForm()}><i className="fas fa-edit"></i></EditPlantButton>
                            <EditPlantButton onClick={() => this.removePlant(this.state.plantid)}><i className="fas fa-trash-alt"></i></EditPlantButton>
                        </PlantButtonsWrapper>
                    </div>
                
                    :
                    <div>
                        <form>
                            <input
                                type="text"
                                name="plantName"
                                value={this.state.formData.plantName}
                                onChange={this.handleChange}
                                /><br />
                            <input
                                type="time"
                                name="dailyWaterTime"
                                value={this.state.formData.dailyWaterTime}
                                onChange={this.handleChange}
                                /><br />
                        </form>
                        <button onClick={() => this.handleEditPlant()}>Confirm</button>
                        <button onClick={() => this.toggleForm()}>Cancel</button>
                    </div>
                
                }  
                </PlantWrapper>              
            </div>

        );
    };
}

const mapStateToProps = state => ({
    plants: state.plant.plants
})

export default connect(mapStateToProps, { getPlant, updatePlant, deletePlant })(Plant);
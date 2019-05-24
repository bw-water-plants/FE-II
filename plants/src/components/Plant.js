import React from 'react';
import { connect } from 'react-redux';
import { getPlant, updatePlant, deletePlant } from '../actions/actions';
import PlantAvatar from './PlantAvatar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PlantWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: whitesmoke;
    margin: 45px auto;
    border-radius: 15px;
    width: 300px;
    padding: 25px;



    h3 {
        font-family: 'Amatic SC', cursive;
        font-size: 48px;
        color: #538b53;
        padding: 15px 0;
        margin: 0;
    }
`

const UsernameBanner = styled.div`
    font-family: 'Amatic SC', cursive;
    font-size: 48px;
    font-weight: 900;
    color: #538b53;

`

const WaterTime = styled.div`
    position:relative;
    padding: 10px 20px;  
    border: 1px solid hsla(210, 50%, 85%, 1);
    background: none;

    width: 250px;
    /* margin: 10px auto 0; */
    
    font-family: 'Amatic SC', cursive;
    font-weight: 900;
    /* text-transform: uppercase; */
    font-size: 25px;  
    letter-spacing: 2px;
    color: white;
    
    background-color: hsl(210, 80%, 42%);
    box-shadow: hsla(210, 40%, 52%, .4) 2px 2px 22px;
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

const PlantButtonsWrapper = styled.div`
    margin-top: 20px;
`

const EditPlantButton = styled.button`
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

const EditPlantForm = styled.form`
    margin-top: 20px;
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

const EditButton = styled.button`
    position:relative;
    padding: 10px 20px;  
    border: 1px solid hsla(210, 50%, 85%, 1);
    background: none;
    cursor: pointer;
    
    margin: 10px auto;
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
        const date = new Date()
        var monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
      ];
      const twilioDate = new Date(monthNames[date.getMonth()] + " " + date.getDate() + ", "  + date.getFullYear())
         //new Date('August 19, 1975 23:15:30 GMT+07:00');
        return(

            <div>


                <PlantWrapper>
                <BackButton><Link to="/protected"><i class="fas fa-arrow-circle-left"></i></Link></BackButton>
                    <PlantAvatar avatarId={this.state.plantAvatarId} avatarHeight="200px" />
                    {!this.state.isUpdatingPlant ?
                    <div>
                        <UsernameBanner>{this.state.formData.plantName}</UsernameBanner>
                        <WaterTime><span>Watering Time:</span> {this.state.formData.dailyWaterTime}</WaterTime>
                        <PlantButtonsWrapper>
                            <EditPlantButton onClick={() => this.toggleForm()}><i className="fas fa-edit"> </i>Edit</EditPlantButton>
                            <EditPlantButton onClick={() => this.removePlant(this.state.plantid)}><i className="fas fa-trash-alt"></i>Delete Plant</EditPlantButton>
                        </PlantButtonsWrapper>
                    </div>
                    :
                    <div>
                        <EditPlantForm>
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
                        </EditPlantForm>
                        <EditButton onClick={() => this.handleEditPlant()}>Confirm</EditButton>
                        <EditButton onClick={() => this.toggleForm()}>Cancel</EditButton>
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
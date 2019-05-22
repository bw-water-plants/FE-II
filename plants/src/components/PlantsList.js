import React from 'react';
import { connect } from 'react-redux';
import { getPlants, createPlant } from '../actions/actions';
import Loader from "react-loader-spinner";
import styled from 'styled-components';

class PlantsList extends React.Component {

    state = {
        isAddingPlant: false,
        newPlant: {
            plantName: '',
            dailyWaterTime: '',
            user_id: localStorage.getItem('id')
        }
    }

    componentDidMount() {
       this.props.getPlants()

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

    render() {
        const userId = localStorage.getItem('id');
        const myPlants = this.props.plants.filter(plant => (
            plant.user_id = userId
        ))

        return (
            <div>
                {myPlants.map(plant =>(
                    <div key={plant.id}>
                        {plant.plantName}
                        {plant.dailyWaterTime}
                    </div>
                ) )}

                {this.state.isAddingPlant ? 
                    
                    <div>                    
                        <form>
                            <input
                                type="text"
                                name="plantName"
                                value={this.state.newPlant.plantName}
                                onChange={this.handleChange}
                                /><br />
                            <input
                                type="text"
                                name="dailyWaterTime"
                                value={this.state.newPlant.dailyWaterTime}
                                onChange={this.handleChange}
                                /><br />
                            <button onClick={() => this.addPlant()}>Submit</ button>
                        </form>
                    </div>

                : <button onClick={() => this.toggleAddPlantForm()}>Add Plant</button>}
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    plants: state.plant.plants
})


export default connect(mapStateToProps, { getPlants, createPlant })(PlantsList)
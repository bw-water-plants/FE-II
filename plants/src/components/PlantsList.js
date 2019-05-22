import React from 'react';
import { connect } from 'react-redux';
import { getPlants } from '../actions/actions';
import Loader from "react-loader-spinner";
import styled from 'styled-components';

class PlantsList extends React.Component {

    componentDidMount() {
       this.props.getPlants()
    }


    render() {
        console.log(this.props.plants)
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
            </div>
        )
    }
}

const mapStateToProps = state => ({
    plants: state.plant.plants
})


export default connect(mapStateToProps, { getPlants })(PlantsList)
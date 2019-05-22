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
        
        return (
            <div>
                PlantList
            </div>
        )
    }
}

const mapStateToProps = state => ({
    plants: state.plant.plants
})


export default connect(mapStateToProps, { getPlants })(PlantsList)
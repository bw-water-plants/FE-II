import React from 'react';
import { connect } from 'react-redux';
import { getPlant, updatePlant, deletePlant } from '../actions/actions';
import moment from 'moment';


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

        console.log(this.props)
        const { plantid } = this.props.match.params;  
        const plant = this.props.plants.filter(plant => plant.id = plantid)

        this.setState({
            ...this.state,
            plantid: plantid,
            formData: {
                plantName: plant.plantName,
                dailyWaterTime: plant.dailyWaterTime
            }
        })
    }
    
    removePlant = id => {
        this.props.deletePlant(id);
    };

    editPlant = id => {
        this.props.updatePlant(id);
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
         this.props.updatePlant(this.props.plant.id, this.state.formData)
         .then(this.toggleForm())
         .then(() => {
             this.props.history.push('/plant');
         });
    }

    render() {        

        return(
            <div>
                {!this.state.isUpdatingPlant ?
                <div>

                    <h3>{this.state.formData.plantName}</h3>
                    <p>{this.state.formData.dailyWaterTime}</p>
                    <button onClick={() => this.toggleForm()}><i className="fas fa-edit"></i></button>
                    <button onClick={() => this.removePlant(this.state.formData.id)}><i className="fas fa-trash-alt"></i></button>
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
                                type="text"
                                name="dailyWaterTime"
                                value={this.state.formData.dailyWaterTime}
                                onChange={this.handleChange}
                                /><br />
                        </form>
                        <button onClick={() => this.handleEditPlant()}>Confirm</button>
                        <button onClick={() => this.toggleForm()}>Cancel</button>
                    </div>
                }                
            </div>

        );
    };
}

const mapStateToProps = state => ({
    plants: state.plant.plants
})

export default connect(mapStateToProps, { getPlant, updatePlant, deletePlant })(Plant);
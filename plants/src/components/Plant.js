import React from 'react';
import { connect } from 'react-redux';
import { updatePlant, deletePlant } from '../actions/actions';
import moment from 'moment';


class Plant extends React.Component {

    state = {
        updatingPlant: false, 
        formData: {
            plantName: 'test',
            dailyWaterTime: 'test',
        }
    };

    componentDidMount() {
        const plant = this.props.plant[1];   
        console.log(plant.plantName)
        console.log(plant.dailyWaterTime)
        this.setState({
            ...this.state,
            formData: {
                plantName: plant.plantName,
                dailyWaterTime: plant.dailyWaterTime
            }
        })
        console.log(this.state)
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
            updatingPlant: !this.state.updatingPlant
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

    handleEditPlant = () => {
         this.props.updatePlant(this.props.plants.id, this.state.formData)
         .then(this.toggleForm())
    }

    render() {        
        const plant = this.props.plant[1];        

        return(
            <div>
                {!this.state.updatingPlant ?
                <div>
                    <h3>{plant.plantName}</h3>
                    <p>{moment(plant.dailyWaterTime).format('hh:mm:ss a')}</p>
                    <button onClick={() => this.toggleForm()}><i className="fas fa-edit"></i></button>
                    <button onClick={() => this.removePlant(plant.id)}><i className="fas fa-trash-alt"></i></button>
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
    plant: state.plant.plants
})

export default connect(mapStateToProps, { updatePlant, deletePlant })(Plant);
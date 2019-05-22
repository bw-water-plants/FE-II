import React from 'react';
import { connect } from 'react-redux';
import { updatePlant, deletePlant } from '../actions/actions';
import moment from 'moment';


class Plant extends React.Component {

    state = {
        isUpdatingPlant: false, 
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
         this.props.updatePlant(this.props.plant[1].id, this.state.formData)
        //  .then(this.toggleForm())
        //  .then(() => {
        //      this.props.history.push('/plant');
        //  });
    }

    render() {        
        const plant = this.props.plant[1];    
        // const waterTime = plant.dailyWaterTime;    

        return(
            <div>
                {!this.state.isUpdatingPlant ?
                <div>
                    <h3>{plant.plantName}</h3>
                    <p>{plant.dailyWaterTime}</p>
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
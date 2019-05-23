import React from 'react';
import { connect } from 'react-redux';
import { updatePlant, deletePlant } from '../actions/actions';
import moment from 'moment';


class Plant extends React.Component {

    state = {
        updatingPlant: false, 
        plantid: '',
        formData: {
            plantName: 'test',
            dailyWaterTime: 'test',
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
            

        return(
            <div>
                {!this.state.updatingPlant ?
                <div>
                    <h3>{this.state.formData.plantName}</h3>
                    <p>{moment(this.state.formData.plantName).format('h:mm:ss a')}</p>
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

export default connect(mapStateToProps, { updatePlant, deletePlant })(Plant);
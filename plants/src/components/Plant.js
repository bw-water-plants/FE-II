import React from 'react';
import { connect } from 'react-redux';
import { updatePlant, deletePlant } from '../actions/actions';
import moment from 'moment';


class Plant extends React.Component {

    state = {
        updatingPlant: false, 
        plantid: '',
        isUpdatingPlant: false, 
        formData: {
            plantName: 'test',
            dailyWaterTime: 'test',
        }
    };

    componentDidMount() {
        console.log(this.props.location.plantState)
        const plant = this.props.location.plantState
        this.setState({
            ...this.state,
            plantid: 1, // NEEDS FIXED plant.id
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
                {!this.state.isUpdatingPlant ?
                <div>

                    <h3>{this.state.formData.plantName}</h3>
                    <p>{this.state.formData.dailyWaterTime}</p>
                    <button onClick={() => this.toggleForm()}><i className="fas fa-edit"></i></button>
                    <button onClick={() => this.removePlant(this.state.plantid)}><i className="fas fa-trash-alt"></i></button>
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
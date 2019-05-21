import { 
} from '../actions/actions';

const initialState = {

    error: '',

//plant state
    plants: [],
    isGettingPlant: false,
    isGettingAllPlants: false,
    isUpdatingPlant: false,
    isDeletingPlant: false,
}

const plantReducer = (state = initialState, action) => {
    switch(action.type) {
        default: 
            return state;
    }
};

export default plantReducer;

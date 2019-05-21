import {     
    GET_PLANTS,
    GET_PLANTS_SUCCESS,
    GET_PLANTS_FAILURE,
    GET_SINGLE_PLANT,
    GET_SINGLE_PLANT_SUCCESS,
    GET_SINGLE_PLANT_FAILURE,
    UPDATE_PLANT,
    UPDATE_PLANT_SUCCESS,
    UPDATE_PLANT_FAILURE,
    DELETE_PLANT,
    DELETE_PLANT_SUCCESS,
    DELETE_PLANT_FAILURE
} from '../actions/actions';

const initialState = {

    error: '',

//plant state
    plants: [],
    plant: [],
    isGettingPlant: false,
    isGettingAllPlants: false,
    isUpdatingPlant: false,
    isDeletingPlant: false,
}

const plantReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PLANTS:
            return {
                ...state,
                isGettingAllPlants: true,
                error: ''
            }
        case GET_PLANTS_SUCCESS:
            return {
                ...state,
                plants: action.payload,
                isGettingAllPlants: false,
                error: ''
            }
        case GET_PLANTS_FAILURE:
            return {
                ...state,
                isGettingAllPlants: false,
                error: action.payload
            }
        case GET_SINGLE_PLANT:
            return {
                ...state,
                isGettingPlant: true,
                error: ''
            }
        case GET_SINGLE_PLANT_SUCCESS:
            return {
                ...state,
                plant: action.payload,
                isGettingPlant: false,
                error: ''
            }
        case GET_SINGLE_PLANT_FAILURE:
            return {
                ...state,
                isGettingPlant: false,
                error: action.payload
            }
        case UPDATE_PLANT:
            return {
                ...state,
                isUpdatingPlant: true,
                error: ''
            }
        case UPDATE_PLANT_SUCCESS:
            return {
                ...state,
                isUpdatingPlant: false,
                error: ''
            }
        case UPDATE_PLANT_FAILURE:
            return {
                ...state,
                isUpdatingPlant: false,
                error: action.payload
            }
        case DELETE_PLANT:
            return {
                ...state,
                isDeletingPlant: true,
                error: ''
            }
        case DELETE_PLANT_SUCCESS:
            return {
                ...state,
                isDeletingPlant: false,
                error: ''
            }
        case DELETE_PLANT_FAILURE:
            return {
                ...state,
                isDeletingPlant: false,
                error: action.payload
            }
        default: 
            return state;
    }
};

export default plantReducer;

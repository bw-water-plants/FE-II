import { 
    LOGIN_START, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE, 
    REGISTRATION_START, 
    REGISTRATION_SUCCESS, 
    REGISTRATION_FAILURE 
} from '../actions/actions';

const initialState = {

    error: '',

//user state
    user: [],
    isLoggingIn: false,
    isRegistering: false,
    isGettingUser: false,
    isUpdatingUser: false,
    isDeletingUser: false,

//plant state
    plants: [],
    isGettingPlant: false,
    isGettingAllPlants: false,
    isUpdatingPlant: false,
    isDeletingPlant: false,
    
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_START:
            return {
                ...state,
                isLoggingIn: true,
                error: ''
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                error: ''
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                error: action.payload
            }
        case REGISTRATION_START:
            return {
                ...state,
                isRegistering: true,
                error: ''
            }
        case REGISTRATION_SUCCESS:
            return {
                ...state,
                isRegistering: false,
                error: ''
            }
        case REGISTRATION_FAILURE:
            return {
                ...state,
                isRegistering: false,
                error: action.payload
            }
        default: 
            return state;;
    }
};

export default reducer;

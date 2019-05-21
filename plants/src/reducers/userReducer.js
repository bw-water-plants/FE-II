import { 
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    GET_SINGLE_USER,
    GET_SINGLE_USER_SUCCESS,
    GET_SINGLE_USER_FAILURE,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE
} from '../actions/actions';

const initialState = {

    error: '',

//user state
    user: {},
    users: [],
    isGettingAllUsers: false,
    isGettingUser: false,
    isUpdatingUser: false,
    isDeletingUser: false

}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                isGettingAllUsers: true,
                error: ''
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                isGettingAllUsers: false,
                error: ''
            }
        case GET_USERS_FAILURE:
            return {
                ...state,
                isGettingAllUsers: false,
                error: action.payload
            }
        case GET_SINGLE_USER:
            return {
                ...state,
                isGettingUser: true,
                error: ''
            }
        case GET_SINGLE_USER_SUCCESS:
            return {
                ...state,
                user: action.payload[0],
                isGettingUser: false,
                error: ''
            }
        case GET_SINGLE_USER_FAILURE:
            return {
                ...state,
                isGettingUser: false,
                error: action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                isUpdatingUser: true,
                error: ''
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isUpdatingUser: false,
                error: ''
            }
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                isUpdatingUser: false,
                error: action.payload
            }
        case DELETE_USER:
            return {
                ...state,
                isDeletingUser: true,
                error: ''
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                isDeletingUser: false,
                error: ''
            }
        case DELETE_USER_FAILURE:
            return {
                ...state,
                isDeletingUser: false,
                error: action.payload
            }
        default: 
            return state;;
    }
};

export default userReducer;

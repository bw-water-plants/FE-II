import {     
    CREATE_REMINDER, CREATE_REMINDER_SUCCESS, CREATE_REMINDER_FAILURE
} from '../actions/actions';

const initialState = {

    error: '',

//plant state
    isSettingReminder: false
}

const twilioReduccer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_REMINDER:
            return {
                ...state,
                isSettingReminder: true,
                error: ''
            };
        case CREATE_REMINDER_SUCCESS:
            return {
                ...state,
                isSettingReminder: false,
                error: ''
            };
        case CREATE_REMINDER_FAILURE:
            return {
                ...state,
                isSettingReminder: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default twilioReduccer;
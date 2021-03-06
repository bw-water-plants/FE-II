import axios from 'axios';
import { axiosWithAuth } from '../axiosWithAuth';

//login(cred)
//registration(cred)

//getUsers()
//getUser(userId)
//updateUser(userId, userObj)
//deleteUser(userId)

//createPlant(plantObj)
//getPlants()
//getSinglePlant(plantId)
//updatePlant(plantId, plantObj)
//deletePlant(plantId)

const url = "https://water-my-plants-lambda.herokuapp.com/api";

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = creds => dispatch => {
    dispatch({type: LOGIN_START})
    return axios 
        .post(url + "/auth/login", creds)
        .then(res => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('id', res.data.user.id)
            localStorage.setItem('username', res.data.user.username)
            localStorage.setItem('avatarid', res.data.user.avatar_id)
            dispatch({ type: LOGIN_SUCCESS, payload: res.data}, console.log(res.data))
        })
        .catch(err => {
            dispatch({type: LOGIN_FAILURE, payload: err})
        })
};

export const REGISTRATION_START = 'REGISTRATION_START';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';


export const registration = creds => dispatch => {
    dispatch({type: REGISTRATION_START})
    return axios 
        .post(url + "/auth/register", creds)
        .then(res => {
            dispatch({ type: REGISTRATION_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({ type: REGISTRATION_FAILURE, payload: err })
        })
};

export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';


export const getUsers = () => dispatch => {
    dispatch({type: GET_USERS});
    axiosWithAuth()
        .get(url + "/users")
        .then(res => {
            dispatch({ type: GET_USERS_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({ type: GET_USERS_FAILURE, payload: err })
        })
};

export const GET_SINGLE_USER = 'GET_SINGLE_USER';
export const GET_SINGLE_USER_SUCCESS = 'GET_SINGLE_USER_SUCCESS';
export const GET_SINGLE_USER_FAILURE = 'GET_SINGLE_USER_FAILURE';


export const getUser = userId => dispatch => {
    dispatch({type: GET_SINGLE_USER})
    return axiosWithAuth()
        .get(url + "/users/" + userId)
        .then(res =>  {
            dispatch({ type: GET_SINGLE_USER_SUCCESS, payload: res.data} )
        })
        .catch(err => {
            dispatch({ type: GET_SINGLE_USER_FAILURE, payload: err })
        })
};

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';


export const updateUser = (userId, userObject) => dispatch => {
    dispatch({type: UPDATE_USER})
    return axiosWithAuth()
        .put(url + "/users/" + userId, userObject)
        .then(res => {
            dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({ type: UPDATE_USER_FAILURE, payload: err })
        })
};

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';


export const deleteUsers = userId => dispatch => {
    dispatch({type: DELETE_USER})
    axiosWithAuth()
        .delete(url + "/users/" + userId)
        .then(res => {
            dispatch({ type: DELETE_USER_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({ type: DELETE_USER_FAILURE, payload: err })
        })
};


export const CREATE_PLANT = 'CREATE_PLANT';
export const CREATE_PLANT_SUCCESS = 'CREATE_PLANT_SUCCESS';
export const CREATE_PLANT_FAILURE = 'CREATE_PLANT_FAILURE';


export const createPlant = plantObject => dispatch => {
    dispatch({type: CREATE_PLANT})
    axiosWithAuth()
        .post(url + "/plants/", plantObject)
        .then(res => {
            dispatch({ type: CREATE_PLANT_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({ type: CREATE_PLANT_FAILURE, payload: err })
        })
};

export const GET_PLANTS = 'GET_PLANTS';
export const GET_PLANTS_SUCCESS = 'GET_PLANTS_SUCCESS';
export const GET_PLANTS_FAILURE = 'GET_PLANTS_FAILURE';


export const getAllPlants = () => dispatch => {
    dispatch({type: GET_PLANTS})
    axiosWithAuth()
        .get(url + "/plants/")
        .then(res => {
            dispatch({ type: GET_PLANTS_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({ type: GET_PLANTS_FAILURE, payload: err })
        })
};

export const GET_PLANTS_WID = 'GET_PLANTS_WID';
export const GET_PLANTS_WID_SUCCESS = 'GET_PLANTS_WID_SUCCESS';
export const GET_PLANTS_WID_FAILURE = 'GET_PLANTS_WID_FAILURE';


export const getPlants = userId => dispatch => {
    dispatch({type: GET_PLANTS_WID})
    axiosWithAuth()
        .get(url + "/users/" + userId + "/plants")
        .then(res => {
            dispatch({ type: GET_PLANTS_WID_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({ type: GET_PLANTS_WID_FAILURE, payload: err })
        })
};

export const GET_SINGLE_PLANT = 'GET_SINGLE_PLANT';
export const GET_SINGLE_PLANT_SUCCESS = 'GET_SINGLE_PLANT_SUCCESS';
export const GET_SINGLE_PLANT_FAILURE = 'GET_SINGLE_PLANT_FAILURE';


export const getPlant = plantId => dispatch => {
    dispatch({type: GET_SINGLE_PLANT})
    axiosWithAuth()
        .get(url + "/plants/" + plantId)
        .then(res => {
            dispatch({ type: GET_SINGLE_PLANT_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({ type: GET_SINGLE_PLANT_FAILURE, payload: err })
        })
};

export const UPDATE_PLANT = 'UPDATE_PLANT';
export const UPDATE_PLANT_SUCCESS = 'UPDATE_PLANT_SUCCESS';
export const UPDATE_PLANT_FAILURE = 'UPDATE_PLANT_FAILURE';

export const updatePlant = (plantId, plantObject) => dispatch => {

    dispatch({type: UPDATE_PLANT})

    return axiosWithAuth()
        .put(url + "/plants/" + plantId, plantObject)
        .then(res => {
            console.log(res)
            dispatch({ type: UPDATE_PLANT_SUCCESS, payload: res.data})
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: UPDATE_PLANT_FAILURE, payload: err })
        })
};

export const DELETE_PLANT = 'DELETE_PLANT';
export const DELETE_PLANT_SUCCESS = 'DELETE_PLANT_SUCCESS';
export const DELETE_PLANT_FAILURE = 'DELETE_PLANT_FAILURE';


export const deletePlant = plantId => dispatch => {
    dispatch({type: DELETE_PLANT})
    return axiosWithAuth()
        .delete(url + "/plants/" + plantId)
        .then(res => {
            dispatch({ type: DELETE_PLANT_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({ type: DELETE_PLANT_FAILURE, payload: err })
        })
};

export const CREATE_REMINDER = 'CREATE_REMINDER';
export const CREATE_REMINDER_SUCCESS = 'CREATE_REMINDER_SUCCESS';
export const CREATE_REMINDER_FAILURE = 'CREATE_REMINDER_FAILURE';

export const createTwilio = twilioObject => dispatch => {
    dispatch({type: CREATE_REMINDER})
    return axiosWithAuth()
        .post(url + "/twilio/", twilioObject)
        .then(res => {
            dispatch({ type: CREATE_REMINDER_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({ type: CREATE_REMINDER_FAILURE, payload: err })
        })
};

export const UPDATE_REMINDER = 'UPDATE_REMINDER';
export const UPDATE_REMINDER_SUCCESS = 'UPDATE_REMINDER_SUCCESS';
export const UPDATE_REMINDER_FAILURE = 'UPDATE_REMINDER_FAILURE';

export const updateTwilio = (twilioId, twilioObject) => dispatch => {
    dispatch({type: UPDATE_REMINDER})
    return axiosWithAuth()
        .put(url + "/twilio/" + twilioId, twilioObject)
        .then(res => {
            dispatch({ type: UPDATE_REMINDER_SUCCESS, payload: res.data}, console.log(res))
        })
        .catch(err => {
            dispatch({ type: UPDATE_REMINDER_FAILURE, payload: err }, console.log(err))
        })
};
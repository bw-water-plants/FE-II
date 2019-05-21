import axios from 'axios';
import { axiosWithAuth } from '../axiosWithAuth';

//login(cred)
//registration(cred)
//getUsers()
//getUser(userId)
//updateUser(userId, userObj)
//deleteUser(userId)

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = creds => dispatch => {
    dispatch({type: LOGIN_START})
    return axios 
        .post("https://water-my-plants-lambda.herokuapp.com/api/auth/login", creds)
        .then(res => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            dispatch({ type: LOGIN_SUCCESS, payload: res.data})
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
        .post("https://water-my-plants-lambda.herokuapp.com/api/auth/register", creds)
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
    dispatch({type: GET_USERS})
    axiosWithAuth()
        .get("/api/users")
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
    axiosWithAuth()
        .get("/api/users/" + userId)
        .then(res => {
            dispatch({ type: GET_SINGLE_USER_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({ type: GET_SINGLE_USER_FAILURE, payload: err })
        })
};

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';


export const updateUsers = userId => userObject => dispatch => {
    dispatch({type: UPDATE_USER})
    axiosWithAuth()
        .put("/api/users/" + userId, userObject)
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
        .delete("/api/users/" + userId)
        .then(res => {
            dispatch({ type: DELETE_USER_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({ type: DELETE_USER_FAILURE, payload: err })
        })
};
import axios from 'axios';

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
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            dispatch({ type: REGISTRATION_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({ type: REGISTRATION_FAILURE, payload: err })
        })
};
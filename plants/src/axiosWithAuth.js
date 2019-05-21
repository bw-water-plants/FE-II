import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');
    return axios.create({
        headers: {
            Authorization: token
        },
        baseUrl: 'https://water-my-plants-lambda.herokuapp.com'
    });
}
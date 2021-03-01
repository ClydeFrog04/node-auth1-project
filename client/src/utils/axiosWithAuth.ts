import axios from 'axios';

export const axiosWithAuth = () => {
    //  get the token from localStorage
    const token = window.localStorage.getItem('token');
    // create a new instance of axios with the config object
    return axios.create({
        timeout: 10000,
        headers: {
            authorization: token,
            username: "test",
            password: "test",
        },
        baseURL: 'http://localhost:4000',
    });
};
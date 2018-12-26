
import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:5000/api/',
    headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('jwtToken') ? localStorage.getItem('jwtToken') : '',
    },
});

export default client;

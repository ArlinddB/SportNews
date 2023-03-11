import axios from 'axios';

const headers = {
    Accept: 'application/json',
    "Content-Type": 'application/json'
}

const apiCaller = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 10 * 1000,
    headers
});

export default apiCaller;
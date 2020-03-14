import axios from 'axios';
axios.defaults.headers.common['Content-Type'] = 'application/json';

let baseUrl = '';


if (window.location.href.indexOf("localhost:3000/") > 0) {
    baseUrl = 'http://localhost:5000/api'
} else {
    baseUrl = 'http://localhost:5000/api'
}


export const apiUrl = axios.create({
    baseURL: baseUrl,
    responseType: 'json'
});


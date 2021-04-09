import axios from 'axios';
// import Auth from './Auth/Auth';

// const auth = new Auth();

let baseURL = process.env.REACT_APP_SERVER_URI;

let _axios = axios.create({ baseURL });

_axios.interceptors.request.use(config => {

    let accessToken = localStorage.getItem('accessToken');
    let app_id = '';

    try {
        app_id = (JSON.parse(localStorage.getItem('user'))).app_id;
    } catch (e) {

    }

    if (accessToken)
        config.headers['Authorization'] = "Bearer " + accessToken;

    if (app_id)
        config.headers['app_id'] = app_id;

    return config;
});

_axios.interceptors.response.use(response => {
    return response;
}, error => {
    let path = window.location.pathname;
    if (error.response.status === 401 && path !== '/') {
        // auth.handleUnAuthentication();
    }

    if (error.response && error.response.data && error.response.data.location) {
        window.location = error.response.data.location
    } else {
        return Promise.reject(error)
    }

});

export default _axios;

import axios from 'axios'
import router from '../router'
import store from '../store'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.withCredentials = false;

// handle before req happen
axios.interceptors.request.use(
    req => {
        const token = localStorage.getItem('token');

        if (token) {
            req.headers['Authorization'] = 'Bearer ' + token
        }

        return req
    },
    err => {
        return Promise.reject(err);
    }
)


// handle before res is send to client
axios.interceptors.response.use(
    res => {
        return res
    },
    err => {
        if (err.response.status === 401) {
            console.log('forbidden')
            store.dispatch('auth/logout')
                .then(() => {
                    return router.push('login');
                })
        }

        return Promise.reject(err)
    }
)

export default axios;

import axios from 'axios'
import router from '../router'
import store from '../store'

let tokenRefreshing = false

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
        let errorCode = err.response.status

        if (errorCode === 401 && !tokenRefreshing) {
            tokenRefreshing = true

            console.log('refresh token')

            store.dispatch('auth/refreshToken').then(res => {
                window.location.reload(true)
            })
        } else if (errorCode === 422 &&
            (
                err.response.data.message === 'Expired refresh token' ||
                err.response.data.message === 'Token could not be parsed from the request.' ||
                err.response.data.message === 'Token Signature could not be verified.'
            )
        ) {
            store.dispatch('auth/logout').then(() => {
                tokenRefreshing = false
                return router.push('login');
            })
        } else {
            tokenRefreshing = false
            return Promise.reject(err)
        }
    }
)

export default axios;

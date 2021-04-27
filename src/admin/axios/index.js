import axios from 'axios'
import router from '../router'
import store from '../store'

let tokenRefreshing = false

axios.defaults.baseURL = `${process.env.VUE_APP_API_URL}/api`;
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

        if (errorCode === 401) {

            if (!tokenRefreshing) {
                tokenRefreshing = true

                return store.dispatch('auth/refreshToken').then(() => {
                    tokenRefreshing = false
                    return axios(err.config)
                })
            } else {
                return new Promise((resolve) => {
                    let interval = setInterval(() => {
                        if (!tokenRefreshing) {
                            clearInterval(interval);
                            resolve(axios(err.config))
                        }
                    }, 300);
                })
            }
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

window.axios = axios;

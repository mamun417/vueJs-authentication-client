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
        let errorCode = err.response.status,
            tokenRefreshing = store.getters['auth/tokenRefreshing']

        if (errorCode === 401 && !tokenRefreshing) {
            store.dispatch('auth/updateTokenRefreshing', {status: true})

            console.log('hit refresh')

            store.dispatch('auth/refreshToken')
                .then(res => {
                    toast.fire({
                        icon: 'success',
                        title: 'Token has been updated Successful!'
                    })

                    store.dispatch('auth/updateTokenRefreshing', {status: false}) // although tokenRefreshing define false after page reload
                        .then(res => {
                            window.location.reload(true)
                        })
                })
                .catch(err => {
                    dispatchLogout()
                })
        } else if (errorCode === 422 &&
            (
                err.response.data.message === 'Expired refresh token' ||
                err.response.data.message === 'Token could not be parsed from the request.'
            )
        ) {
            dispatchLogout()
        } else {
            return Promise.reject(err)
        }
    }
)

function dispatchLogout() {
    store.dispatch('auth/logout').then(() => {
        return router.push('login');
    })
}

export default axios;

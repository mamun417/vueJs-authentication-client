import axios from 'axios'
import router from '../router'
import store from '../store'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.withCredentials = false;

// handle before req happen
axios.interceptors.request.use(
    req => {
        const token = localStorage.getItem('token');

        console.log('p h')
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
            store.dispatch('auth/logout')
                .then(() => {
                    return router.push('login');
                })
        }

       /* let errorCode = err.response.status

        if (errorCode === 401) {
            console.log('bbbbbbb')
            store.dispatch('auth/refreshToken')
                .then(res => {

                    console.log('401')

                    toast.fire({
                        icon: 'success',
                        title: 'Token has been updated Successful!'
                    })

                    let token = res.data.access_token
                    //axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                    console.log('2')
                    return axios(err.config).then(res => {
                        console.log(res)
                    })
                })
                .catch(err => {
                    //
                })
        } else if (errorCode === 422) { // Refresh token is expired or Invalid token
            store.dispatch('auth/logout').then(() => {
                return router.push('login');
            })
        } else {
            return Promise.reject(err)
        }*/
    }
)

export default axios;

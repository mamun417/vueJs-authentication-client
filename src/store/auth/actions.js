export function register(context, payload) {
    return new Promise((resolve, reject) => {
        axios.post('register', payload.inputs)
            .then(res => {
                let userInfo = res.data;
                context.commit('authSuccess', userInfo);
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function login(context, payload) {
    return new Promise((resolve, reject) => {
        axios.post('auth/login', payload.inputs)
            .then(res => {
                let userInfo = res.data;
                context.commit('authSuccess', userInfo);
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function refreshToken(context, payload) {
    return new Promise((resolve, reject) => {
        axios.post('auth/refresh')
            .then(res => {
                context.commit('updateToken', res.data.access_token)
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function logout(context) {
    return new Promise((resolve) => {
        context.commit('authOut');
        resolve(true)
    })
}

export function sendPasswordResetEmail(context, payload) {
    return new Promise((resolve, reject) => {
        axios.post('password/email', payload.inputs)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function resetPassword(context, payload) {
    return new Promise((resolve, reject) => {
        axios.put('password/reset', payload.inputs)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function updateToken(context, token) {
    context.commit('updateToken', token);
}

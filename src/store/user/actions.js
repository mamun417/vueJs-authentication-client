export function getProfile(context, payload) {
    return new Promise((resolve, reject) => {
        axios.post('auth/me')
            .then(res => {
                context.commit('updateProfile', res.data.user)
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function changeProfile(context, payload) {
    return new Promise((resolve, reject) => {
        axios.patch('profile/update', payload.inputs)
            .then(res => {
                context.commit('updateProfile', res.data.user)
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function checkPassword(context, payload) {
    return new Promise((resolve, reject) => {
        axios.post('password/check', payload.inputs)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function changePassword(context, payload) {
    return new Promise((resolve, reject) => {
        axios.patch('password/change', payload.inputs)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

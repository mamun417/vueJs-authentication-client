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

export function logout(context) {
    return new Promise((resolve) => {
        context.commit('authOut');
        resolve(true)
    })
}

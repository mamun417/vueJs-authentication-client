export function login(context, payload) {
    return new Promise((resolve, reject) => {
        axios.post('auth/login', payload.inputs)
            .then(res => {
                let userInfo = res.data;
                console.log(res)
                context.commit('storeUser', userInfo);
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

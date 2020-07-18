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

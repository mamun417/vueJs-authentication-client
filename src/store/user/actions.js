export function getUsers(context, payload) {
    return new Promise((resolve, reject) => {
        axios.get('admin/users', {
            params: {
                page: payload.paginationMeta.current_page,
            }
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function addUser(context, payload) {
    return new Promise((resolve, reject) => {
        axios.post('admin/users', payload.inputs)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function updateUser(context, payload) {
    return new Promise((resolve, reject) => {
        axios.put('admin/users/' + payload.inputs.id, payload.inputs)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function deleteUser(context, payload) {
    return new Promise((resolve, reject) => {
        axios.delete('admin/users/' + payload.id)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

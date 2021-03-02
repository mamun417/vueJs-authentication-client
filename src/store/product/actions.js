export function getUsers(context, payload) {
    return new Promise((resolve, reject) => {
        axios.get('admin/users', {
            params: {
                page: payload.paginationMeta.current_page,
            }
        })
            .then(res => {
                console.log(res)
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function createProduct(context, payload) {
    return new Promise((resolve, reject) => {
        axios.post('products', payload.inputs)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function updateProduct(context, payload) {
    return new Promise((resolve, reject) => {
        axios.post('products/' + payload.inputs.get('id'), payload.inputs)
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

export function changeStatus(context, payload) {
    return new Promise((resolve, reject) => {
        axios.patch('products/change-status/' + payload.inputs.id)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

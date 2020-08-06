export function getProducts(context, payload) {
    return new Promise((resolve, reject) => {
        axios.get('products', {
            params: {
                page: payload.paginationMeta.current_page,
                search: payload.pipeline.search,
                filter: payload.pipeline.filter
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
        axios.post('products/'+payload.inputs.get('id'), payload.inputs)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function deleteProduct(context, payload) {
    return new Promise((resolve, reject) => {
        axios.delete('products/'+payload.id)
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
        axios.patch('products/change-status/'+payload.inputs.id)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

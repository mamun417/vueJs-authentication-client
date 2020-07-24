export function getProducts() {
    console.log('getProducts')
    return new Promise((resolve, reject) => {
        axios.get('products')
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
        axios.patch('products/'+payload.inputs.id, payload.inputs)
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

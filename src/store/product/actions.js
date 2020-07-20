export function getProducts() {
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

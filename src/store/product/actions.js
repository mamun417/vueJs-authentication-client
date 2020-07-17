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

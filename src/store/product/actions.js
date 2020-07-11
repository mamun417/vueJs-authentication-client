export function getProducts() {
    return new Promise((resolve, reject) => {
        axios.get('products')
            .then(res => {
                console.log(res.data)
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

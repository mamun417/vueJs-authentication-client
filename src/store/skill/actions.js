export function getSkills(context, payload) {
    return new Promise((resolve, reject) => {
        axios.get('skills')
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

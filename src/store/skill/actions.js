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

export function createSkill(context, payload) {
    return new Promise((resolve, reject) => {
        axios.post('skills', payload.inputs)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

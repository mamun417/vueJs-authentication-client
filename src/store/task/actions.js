export function getTasks(context, payload) {
    return new Promise((resolve, reject) => {

        let url = 'admin/tasks'

        axios.get(url, {
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

export function getUsers(context, payload) {
    return new Promise((resolve, reject) => {
        axios.get('admin/get-users')
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function addTask(context, payload) {
    return new Promise((resolve, reject) => {
        axios.post('admin/tasks', payload.inputs)
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

export function deleteTask(context, payload) {
    return new Promise((resolve, reject) => {
        axios.delete('admin/tasks/' + payload.id)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

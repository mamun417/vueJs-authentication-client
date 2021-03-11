export function getTasks(context, payload) {
    return new Promise((resolve, reject) => {

        let userInfo = localStorage.getItem('user');
        let role_id = JSON.parse(userInfo).role_id;

        let url = role_id === 1 ? 'admin/tasks' : '/tasks';

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


export function updateTask(context, payload) {

    let userInfo = localStorage.getItem('user');
    let role_id = JSON.parse(userInfo).role_id;

    let url = role_id === 1 ? 'admin/tasks/' : 'tasks/update-status/';

    return new Promise((resolve, reject) => {
        axios.patch(url + payload.inputs.id, payload.inputs)
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

export function getTaskReport(context, payload) {
    return new Promise((resolve, reject) => {
        axios.get('admin/tasks/report', {
            params: {
                year: payload.year,
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
